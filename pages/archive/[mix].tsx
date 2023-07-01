import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { Maybe } from 'yup';
import { defaultMixes } from '@/defaults/defaults';
import { ArchiveApi } from '@/entities/archive/api';
import { MixDescription, MixPageProps } from '@/pages/mix';
import { MixPage } from '@/pages/mix/ui/mix-page';
import { client } from '@/shared/api/apollo/apollo-client';
import type {
  InputMaybe,
  MixEntity,
  MixEntityResponseCollection,
  MixFiltersInput,
} from '@/shared/api/graphql/__generated__/schema.graphql';
import { SITE_URL } from '@/shared/config/environment';
import { getDescription } from '@/shared/lib/get-gescription';
import { getMarkdownToHtml } from '@/shared/lib/markdown-to-html';
import { setSeoAltText } from '@/shared/lib/set-seo-alt-text';
import type { Description } from '@/shared/types/description.interface';
import { Seo } from '@/shared/ui/seo/seo';

const BaseUrl = SITE_URL && new URL(SITE_URL);

const Page: NextPage<MixPageProps> = (props) => {
  const attributes = props.mixes?.data[0].attributes;

  const imageSeo = attributes?.image.data?.attributes?.url;

  const seoMixDescription = getDescription(attributes);
  const seoGuestDescription = getDescription(
    attributes?.guests?.data[0]?.attributes
  );
  const seoShowDescription = getDescription(attributes?.show?.data?.attributes);

  const genresNames =
    attributes?.genres?.data && attributes.genres.data.length > 0
      ? 'Playing ' +
        attributes.genres.data.map((mix) => mix.attributes?.name) +
        '. '
      : '';

  const seoDescription =
    seoMixDescription ??
    seoGuestDescription ??
    seoShowDescription ??
    attributes?.name + ' has prepared a mix for Local Radio';

  const fullSeoDescription = genresNames + seoDescription;
  const fullSeoTitle = setSeoAltText({
    title: attributes?.name,
    date: attributes?.date,
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fullSeoTitle,
    author: {
      '@type': 'Person',
      name: attributes?.guests?.data[0]?.attributes?.name ?? 'Local Radio',
      // The full URL must be provided, including the website's domain.
      url: new URL(
        attributes?.guests?.data[0]?.attributes?.slug
          ? `archive/residents/${attributes.guests.data[0]?.attributes?.slug}`
          : '',
        BaseUrl
      ),
    },
    image: imageSeo,
    datePublished: attributes?.createdAt,
    dateModified: attributes?.updatedAt,
  };

  return (
    <>
      <Seo
        templateTitle={fullSeoTitle}
        description={fullSeoDescription}
        image={imageSeo}
        schema={schema}
      />
      <MixPage {...props} />
    </>
  );
};

interface MixPageParams extends ParsedUrlQuery {
  mix: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<MixPageProps>> => {
  const { mix } = context.params as MixPageParams;
  try {
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );

    const { mixes } = await ArchiveApi.fetchMixes<MixEntityResponseCollection>({
      filters: { slug: { eq: mix } },
    });

    if (mixes.data.length === 0) {
      return {
        notFound: true,
      };
    }

    const mixDate = mixes.data[0].attributes?.date;
    const mixesShowSlug =
      mixes.data[0].attributes?.show?.data?.attributes?.slug;
    const guestsSlug =
      mixes.data[0].attributes?.guests?.data[0]?.attributes?.slug;

    const guestsMixesLength =
      mixes.data[0].attributes?.guests?.data[0]?.attributes?.mixes?.data;

    const descriptionMix = await getMarkdownToHtml(mixes.data[0].attributes);
    const descriptionGuest = await getMarkdownToHtml(
      mixes.data[0].attributes?.guests?.data[0]?.attributes
    );
    const descriptionShow = await getMarkdownToHtml(
      mixes.data[0].attributes?.show?.data?.attributes
    );

    const tracklist = (await getMarkdownToHtml(
      mixes.data[0].attributes?.tracklist
    )) as Description;

    const description = {
      mix: descriptionMix,
      guest: descriptionGuest,
      show: descriptionShow,
    } as MixDescription;

    const {
      data: { siblingRight, siblingLeft },
    } = await client.query({
      query: ArchiveApi.MixSiblingsDocument,
      variables: {
        date: mixDate,
      },
    });

    const currentGenres = mixes.data[0].attributes?.genres?.data.map(
      ({ attributes }) => attributes?.slug
    );

    const id = mixes.data[0]?.id;

    const getMoreEpisodes = async (filters?: InputMaybe<MixFiltersInput>) => {
      const { mixes } =
        await ArchiveApi.fetchMixes<MixEntityResponseCollection>({
          filters,
        });

      return mixes;
    };

    let moreEpisodes: MixEntity[] = [];
    let totalCount: Maybe<number> = 0;

    if (mixesShowSlug) {
      const data = await getMoreEpisodes({
        show: { slug: { eq: mixesShowSlug } },
        id: { ne: id },
      });
      moreEpisodes = data.data;
      totalCount = data.meta.pagination.total;
    }
    if (
      guestsMixesLength &&
      guestsMixesLength.length > 1 &&
      guestsSlug &&
      !mixesShowSlug
    ) {
      const data = await getMoreEpisodes({
        guests: { slug: { eq: guestsSlug } },
        id: { ne: id },
      });

      moreEpisodes = data.data;
      totalCount = data.meta.pagination.total;
    }

    if (moreEpisodes.length === 0) {
      const data = await getMoreEpisodes({
        genres: {
          slug: { in: [currentGenres?.find((x) => x !== undefined) ?? ''] },
        },
        id: { ne: id },
      });
      moreEpisodes = data.data;
      totalCount = data.meta.pagination.total;
    }

    return {
      props: {
        mixPrev: siblingLeft?.data,
        mixNext: siblingRight?.data,
        mixes,
        totalCount,
        moreEpisodes,
        description,
        tracklist,
      },
    };
  } catch (error) {
    const mixes = defaultMixes.data.find(
      (data) => data.attributes?.slug === mix
    );
    if (mixes)
      return {
        props: { mixes: { data: mixes ? [mixes] : [] } },
      };

    return { props: {} };
  }
};

export default Page;

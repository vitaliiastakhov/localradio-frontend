import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { defaultMixes } from '@/defaults/defaults';
import { MixPageProps } from '@/pages/mix';
import { getMixPageData } from '@/pages/mix/api/get-mix-page-data';
import { MixPage } from '@/pages/mix/ui/mix-page';
import { SITE_URL } from '@/shared/config/environment';
import { getDescription } from '@/shared/lib/get-gescription';
import { setSeoAltText } from '@/shared/lib/set-seo-alt-text';
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
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const { mix } = context.params as MixPageParams;
  try {
    const data = getMixPageData({ slug: mix });

    return {
      props: data,
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

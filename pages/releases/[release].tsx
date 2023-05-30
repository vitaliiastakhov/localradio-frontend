import type { GetServerSideProps, NextPage } from 'next';
import { ArchiveApi } from '@/entities/archive/api';
import { ReleasePage, ReleasePageProps } from '@/pages/release/ui/release-page';
import { client } from '@/shared/api/apollo/apollo-client';
import { getDescription } from '@/shared/lib/get-gescription';
import { getMarkdownToHtml } from '@/shared/lib/markdown-to-html';
import { Seo } from '@/shared/ui/seo/seo';

const Page: NextPage<ReleasePageProps> = (props) => {
  const { attributes } = props.releases.data[0];

  const title = `${attributes?.artistName} - ${attributes?.releaseName}`;
  const descriptionSeo = getDescription(attributes);

  const imageSeo = attributes?.cover.data?.attributes?.url;

  return (
    <>
      <Seo
        templateTitle={title}
        image={imageSeo}
        description={descriptionSeo}
      />

      <ReleasePage {...props} />
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { release } = context.params as { release: string };

  const {
    data: { releases },
  } = await client.query({
    query: ArchiveApi.ReleasesDocument,
    variables: {
      filters: { slug: { eq: release } },
    },
  });

  if (releases?.data.length === 0) {
    return {
      notFound: true,
    };
  }

  const description = await getMarkdownToHtml(releases?.data[0].attributes);

  return {
    props: { releases, description },
  };
};

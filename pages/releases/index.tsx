import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import { ArchiveApi } from '@/entities/archive/api';
import { ArchivePage } from '@/pages/archive/ui/archive-page';
import { client } from '@/shared/api/apollo/apollo-client';
import type { ReleaseEntityResponseCollection } from '@/shared/api/graphql/__generated__/schema.graphql';
import { Seo } from '@/shared/ui/seo/seo';

interface PageProps {
  releases: ReleaseEntityResponseCollection;
}

const Page: NextPage<PageProps> = ({ releases }) => {
  return (
    <div>
      <Seo templateTitle='Releases' />

      <ArchivePage
        variant='releases'
        totalCount={releases.meta.pagination.total}
        data={releases.data}
        secondHeaderText='/Releases/'
      />
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<PageProps>
> => {
  const {
    data: { releases },
  } = await client.query({
    query: ArchiveApi.ReleasesDocument,
    variables: { limit: 12 },
  });

  return {
    props: { releases: releases as ReleaseEntityResponseCollection },
    revalidate: 60,
  };
};

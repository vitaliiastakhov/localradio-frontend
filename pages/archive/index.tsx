import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ArchiveApi } from '@/entities/archive/api';
import { ArchivePage } from '@/pages/archive/ui/archive-page';
import { MixEntityResponseCollection } from '@/shared/api/graphql/__generated__/schema.graphql';
import { Seo } from '@/shared/ui/seo/seo';

interface PageProps {
  mixes?: MixEntityResponseCollection;
}

const Page: NextPage<PageProps> = ({ mixes }) => {
  return (
    <>
      <Seo templateTitle='Archive' />
      <ArchivePage
        variant='mixes'
        totalCount={mixes?.meta.pagination.total}
        data={mixes?.data}
        secondHeaderText='/Archive/'
        mixesFilter={{}}
      />
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<PageProps>
> => {
  const mixes = await ArchiveApi.fetchMixes({ limit: 12 });

  return {
    props: { mixes: mixes as MixEntityResponseCollection },
  };
};

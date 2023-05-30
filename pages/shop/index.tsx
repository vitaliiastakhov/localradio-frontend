import type { GetServerSideProps, NextPage } from 'next';
import { ShopItemsDocument } from '@/entities/store/items/api/shop-items.graphql.interface';
import { ArchivePage } from '@/pages/archive/ui/archive-page';
import { client } from '@/shared/api/apollo/apollo-client';
import { ShopItemEntityResponseCollection } from '@/shared/api/graphql/__generated__/schema.graphql';
import { Seo } from '@/shared/ui/seo/seo';

interface PageProps {
  shopItems: ShopItemEntityResponseCollection;
}

const Page: NextPage<PageProps> = ({ shopItems }) => {
  return (
    <>
      <Seo templateTitle='Shop' />
      <ArchivePage
        secondHeaderText='/shop/'
        totalCount={shopItems.meta.pagination.total}
        data={shopItems.data}
        variant='shop'
      />
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data: { shopItems },
  } = await client.query({
    query: ShopItemsDocument,
    variables: { limit: 12 },
  });

  return {
    props: { shopItems },
  };
};

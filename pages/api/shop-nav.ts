import { NextApiRequest, NextApiResponse } from 'next';
import { ShopCategoriesDocument } from '@/entities/store/items/api/shop-items.graphql.interface';
import { client } from '@/shared/api/apollo/apollo-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      data: { shopCategories },
    } = await client.query({
      query: ShopCategoriesDocument,
    });
    res.status(200).send({ shopCategories });
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

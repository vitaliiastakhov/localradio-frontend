import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/shared/api/apollo/apollo-client';
import { RandomMixDocument } from '@/widgets/players/soundcloud/api/random-mix.graphql.interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      data: { randomMix },
    } = await client.query({
      query: RandomMixDocument,
      fetchPolicy: 'network-only',
    });
    res.status(200).send({ randomMix });
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

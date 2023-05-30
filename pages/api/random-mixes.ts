import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/shared/api/apollo/apollo-client';
import { RandomMixesDocument } from '@/widgets/players/soundcloud/api/random-mix.graphql.interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.body;
    const {
      data: { randomMixes },
    } = await client.query({
      query: RandomMixesDocument,
      variables: { id: Number(id) },
    });
    res.status(200).send({ randomMixes });
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/shared/api/apollo/apollo-client';
import { StreamIsLiveDocument } from '@/widgets/players/stream/api/stream-is-live.graphql.interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      data: { streamIsLive },
    } = await client.query({
      query: StreamIsLiveDocument,
      fetchPolicy: 'no-cache',
    });
    res.status(200).send({ streamIsLive });
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

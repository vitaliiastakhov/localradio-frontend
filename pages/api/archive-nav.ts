import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/shared/api/apollo/apollo-client';
import { ArchiveNavigationDocument } from '@/widgets/navigation/archive/api/navigation.graphql.interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await client.query({
      query: ArchiveNavigationDocument,
      fetchPolicy: 'no-cache',
    });
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

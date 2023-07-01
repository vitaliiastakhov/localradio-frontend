import { NextApiRequest, NextApiResponse } from 'next';
import { ArchiveApi } from '@/entities/archive/api';
import { client } from '@/shared/api/apollo/apollo-client';
import {
  GenreEntityResponseCollection,
  MixEntityResponseCollection,
} from '@/shared/api/graphql/__generated__/schema.graphql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.body;
  try {
    const data = await search(query);
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

export const search = async (searchValue: string) => {
  const { mixes } = await ArchiveApi.fetchMixes<MixEntityResponseCollection>({
    filters: {
      name: { contains: searchValue },
    },
    limit: 24,
  });

  const {
    data: { genres },
  } = await client.query({
    query: ArchiveApi.GenresDocument,
    variables: {
      filters: {
        name: { contains: searchValue },
      },
    },
  });

  return {
    mixes,
    genres: genres as GenreEntityResponseCollection,
  };
};

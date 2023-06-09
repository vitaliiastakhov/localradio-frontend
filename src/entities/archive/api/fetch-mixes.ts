import { OperationVariables } from '@apollo/client';
import { client } from '@/shared/api/apollo/apollo-client';
import { MixEntityResponseCollection } from '@/shared/api/graphql/__generated__/schema.graphql';
import { MixesDocument } from './mix/mix.graphql.interface';

export const fetchMixes = async <T = MixEntityResponseCollection>(
  variables: OperationVariables
) => {
  const { data, error } = await client.query({
    query: MixesDocument,
    variables,
  });
  return { mixes: data.mixes as T, error };
};

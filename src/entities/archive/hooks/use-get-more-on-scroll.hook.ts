import type { ApolloQueryResult } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import {
  ArchiveApi,
  GuestsQuery,
  MixesQuery,
  ReleasesQuery,
} from '@/entities/archive/api';
import { CardListProps } from '@/entities/archive/lib/types';
import { client } from '@/shared/api/apollo/apollo-client';

export type UseGetMoreOnScrollResponse = ReturnType<typeof useGetMoreOnScroll>;

type UseGetMoreOnScrollProps = Pick<
  CardListProps,
  'data' | 'mixesFilter' | 'releasesFilter' | 'residentsFilter' | 'variant'
>;

const getNewData = async <T>(
  query: DocumentNode,
  start?: number,
  filters?: any
): Promise<ApolloQueryResult<T>> => {
  const dataNew = await client.query({
    query,
    variables: {
      limit: 12,
      start,
      filters,
    },
  });
  if (dataNew.error) {
    throw new Error(dataNew.error.message);
  }

  return dataNew;
};

export const useGetMoreOnScroll = ({
  data,
  mixesFilter,
  variant,
  releasesFilter,
  residentsFilter,
}: UseGetMoreOnScrollProps) => {
  const [cardListItems, setCardListItems] = useState<any[] | undefined>(data);
  const { showBoundary } = useErrorBoundary();

  const concatCardList = (data: any[]) =>
    setCardListItems((prev) => prev && prev.concat(data));

  const getMore = async () => {
    if (mixesFilter && cardListItems) {
      try {
        const dataNew = await getNewData<MixesQuery>(
          ArchiveApi.MixesDocument,
          cardListItems.length,
          mixesFilter
        );

        const mixesData = dataNew.data.mixes?.data;

        mixesData &&
          (variant === 'mixes' || variant === 'show') &&
          concatCardList(mixesData);
      } catch (error) {
        showBoundary(error);
      }
    }

    if (releasesFilter && cardListItems) {
      try {
        const dataNew = await getNewData<ReleasesQuery>(
          ArchiveApi.ReleasesDocument,
          cardListItems.length,
          releasesFilter
        );

        const releasesData = dataNew.data.releases?.data;

        releasesData && variant === 'releases' && concatCardList(releasesData);
      } catch (error) {
        showBoundary(error);
      }
    }
    if (residentsFilter && cardListItems) {
      try {
        const dataNew = await getNewData<GuestsQuery>(
          ArchiveApi.GuestsDocument,
          cardListItems.length,
          residentsFilter
        );

        const residentsData = dataNew.data.guests?.data;

        residentsData && variant === 'guests' && concatCardList(residentsData);
      } catch (error) {
        showBoundary(error);
      }
    }
  };
  return {
    cardListItems,
    setCardListItems,
    getMore,
  };
};

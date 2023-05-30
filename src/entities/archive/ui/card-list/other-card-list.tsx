import InfiniteScroll from 'react-infinite-scroll-component';
import { UseGetMoreOnScrollResponse } from '@/entities/archive/hooks/use-get-more-on-scroll';
import { CardListProps } from '../../lib/types';
import { CardListSwitch } from './card-list-switch';

interface OtherCardListProps
  extends CardListProps,
    Pick<UseGetMoreOnScrollResponse, 'getMore' | 'cardListItems'> {}

export const OtherCardList = ({
  variant,
  getMore,
  cardListItems,
  totalCount,
}: OtherCardListProps) => {
  if (cardListItems && cardListItems.length > 0)
    return (
      <InfiniteScroll
        next={getMore}
        hasMore={Boolean(totalCount && totalCount > cardListItems.length)}
        hasChildren={true}
        dataLength={cardListItems.length > 0 ? cardListItems.length : 0}
        loader={
          <div className='flex w-full items-center justify-center text-black'>
            Loading...
          </div>
        }
        className='relative grid grid-cols-1 gap-1.5   px-1.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2.5 lg:px-2 xl:grid-cols-4 xl:px-3.5 4xl:grid-cols-5'
      >
        <CardListSwitch
          pageVariant='other'
          data={cardListItems}
          variant={variant}
        />
      </InfiniteScroll>
    );

  return null;
};

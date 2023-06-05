import Link from 'next/link';
import { memo, useEffect } from 'react';
import { useGetMoreOnScroll } from '@/entities/archive/hooks/use-get-more-on-scroll';
import { Heading } from '@/shared/ui/headings/heading';
import type { CardListProps } from '../../lib/types';
import { CardListHeader } from './card-list-header';
import { HomeCardList } from './home-card-list';
import { OtherCardList } from './other-card-list';

export const CardList = memo((props: CardListProps) => {
  const {
    mixesFilter,
    text,
    data,
    variant,
    releasesFilter,
    residentsFilter,
    secondHeader,
    pageVariant,
  } = props;
  const { setCardListItems, cardListItems, getMore } = useGetMoreOnScroll({
    data,
    variant,
    releasesFilter,
    residentsFilter,
    mixesFilter,
  });

  useEffect(() => {
    setCardListItems(data);
  }, [data, setCardListItems]);

  return (
    <section className='flex w-full flex-col gap-3 pb-2 font-semibold 2xl:pb-[1rem]'>
      <div>
        {cardListItems && cardListItems.length > 0 ? (
          <div>
            {pageVariant === 'other' && (
              <div className='grid text-[1.85rem] uppercase leading-none sm:text-[2.3rem] lg:text-[3rem]'>
                <CardListHeader
                  sizeVariant='small'
                  secondHeader={secondHeader}
                  text={text}
                />
              </div>
            )}
            {pageVariant === 'home' && (
              <div className='pb-1 lg:pb-1.5'>
                <div className='w-fit bg-black  text-primary hover:text-secondary-dark'>
                  <Link href={`/${variant === 'mixes' ? 'archive' : variant}`}>
                    <Heading<'h2'>
                      as='h2'
                      sizeVariant='small'
                      className='leading-[1.2]'
                    >
                      /{text}/
                    </Heading>
                  </Link>
                </div>
              </div>
            )}
            {pageVariant === 'other' && (
              <OtherCardList
                cardListItems={cardListItems}
                getMore={getMore}
                {...props}
              />
            )}
            {pageVariant === 'home' && (
              <HomeCardList cardListItems={cardListItems} variant={variant} />
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
});

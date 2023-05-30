import { ShopCard } from '@/entities/store/items/ui/shop-card';
import {
  EventEntity,
  GuestEntity,
  MixEntity,
  ReleaseEntity,
  ShopItemEntity,
  ShowEntity,
} from '@/shared/api/graphql/__generated__/schema.graphql';
import { clsxm } from '@/shared/lib/clsxm';
import type { EntityVariant } from '@/shared/types/entity-variants.interface';
import { EventCard } from '../cards/event-card/event-card';
import { MixCard } from '../cards/mix-card/mix-card';
import { ReleaseCard } from '../cards/release-card/release-card';
import { ShowResidentCard } from '../cards/show-resident-card/show-resident-card';

export interface CardListSwitchProps {
  data?: any[];
  variant: EntityVariant;
  indexPageText?: string;
  pageVariant: 'home' | 'other';
}

interface HomePageCardWrapperProps extends React.PropsWithChildren {
  index: number;
  length: number;
  pageVariant: 'home' | 'other';
}

const HomePageCardWrapper = ({
  children,
  length,
  index,
  pageVariant = 'other',
}: HomePageCardWrapperProps) => {
  return (
    <div
      className={clsxm({
        '4xl:hidden':
          length >= 10 && length < index + 3 && pageVariant === 'home',
      })}
    >
      {children}
    </div>
  );
};

export const CardListSwitch = ({
  variant,
  data,
  pageVariant,
}: Omit<CardListSwitchProps, 'indexPageText'>) => {
  if (data)
    return (
      <>
        {(variant === 'mixes' || variant === 'show' || variant === 'search') &&
          data.map((mix: MixEntity, i) => {
            return (
              <HomePageCardWrapper
                key={mix.attributes?.slug}
                pageVariant={pageVariant}
                length={data.length}
                index={i}
              >
                <MixCard sizeVariant='standard' {...mix} />
              </HomePageCardWrapper>
            );
          })}
        {variant === 'releases' &&
          data.map((release: ReleaseEntity, i) => {
            return (
              <HomePageCardWrapper
                key={release.attributes?.slug}
                pageVariant={pageVariant}
                length={data.length}
                index={i}
              >
                <ReleaseCard {...release} />
              </HomePageCardWrapper>
            );
          })}
        {variant === 'events' &&
          data.map((event: EventEntity, i) => {
            return (
              <HomePageCardWrapper
                key={event.attributes?.slug}
                pageVariant={pageVariant}
                length={data.length}
                index={i}
              >
                <EventCard attributes={event.attributes} />
              </HomePageCardWrapper>
            );
          })}
        {variant === 'shop' &&
          data.map((product: ShopItemEntity, i) => {
            return (
              <HomePageCardWrapper
                key={product.attributes?.slug}
                pageVariant={pageVariant}
                length={data.length}
                index={i}
              >
                <ShopCard {...product} />
              </HomePageCardWrapper>
            );
          })}
        {variant === 'guests' &&
          data.map((resident: GuestEntity, i) => {
            return (
              <HomePageCardWrapper
                key={resident.attributes?.slug}
                pageVariant={pageVariant}
                length={data.length}
                index={i}
              >
                <ShowResidentCard {...resident} />
              </HomePageCardWrapper>
            );
          })}
        {variant === 'shows' &&
          data.map((show: ShowEntity, i) => {
            return (
              <HomePageCardWrapper
                key={show.attributes?.slug}
                pageVariant={pageVariant}
                length={data.length}
                index={i}
              >
                <ShowResidentCard {...show} />
              </HomePageCardWrapper>
            );
          })}
      </>
    );

  return null;
};

import {
  EventEntity,
  GenreEntity,
  Maybe,
  MixEntity,
  MoodEntity,
  PopularityResponse,
  ReleaseEntity,
  ShopItemEntity,
} from '@/shared/api/graphql/__generated__/schema.graphql';
import { HomePageContent } from './home-page-content';
import { HomePageTop } from './home-page-top';

export interface HomePageProps {
  latest?: MixEntity[];
  homePageRandomMix?: MixEntity;
  releases: ReleaseEntity[];
  shopItems: ShopItemEntity[];
  events: EventEntity[];
  schedules?: PopularityResponse[];
  genres: GenreEntity[];
  moods: MoodEntity[];
  streamIsLive?: Maybe<boolean>;
}

export const HomePage = ({
  latest,
  releases,
  shopItems,
  events,
  homePageRandomMix,
  schedules,
  genres,
  moods,
  streamIsLive,
}: HomePageProps) => {
  return (
    <main className='flex w-full flex-col pb-1.5 md:pb-3 lg:pb-3.5 2xl:pb-5'>
      <h1 className='sr-only'>Local Radio</h1>
      <HomePageTop
        streamIsLive={streamIsLive}
        schedules={schedules}
        homePageRandomMix={homePageRandomMix}
      />
      <HomePageContent
        shopItems={shopItems}
        events={events}
        releases={releases}
        genres={genres}
        moods={moods}
        latest={latest}
      />
    </main>
  );
};

import { ScheduleQuery } from '@/entities/schedule/api/schedule.graphql.interface';
import { Maybe } from '@/shared/api/graphql/__generated__/schema.graphql';
import { HomepageQuery } from '../api/home-page.graphql.interface';
import { HomePageRandomMixQuery } from '../api/home-page-random-mix.graphql.interface';
import { HomePageContent } from './home-page-content';
import { HomePageTop } from './home-page-top';

export interface HomePageProps extends HomepageQuery {
  homePageRandomMix?: HomePageRandomMixQuery['homePageRandomMix'];
  schedules?: ScheduleQuery['eventSchedulesFixed'];
  streamIsLive?: Maybe<boolean>;
  error?: boolean;
}

export const HomePage = (props: HomePageProps) => {
  const { streamIsLive, schedules, homePageRandomMix, ...rest } = props;
  return (
    <main className='flex w-full flex-col pb-1.5 md:pb-3 lg:pb-3.5 2xl:pb-5'>
      <h1 className='sr-only'>Local Radio</h1>
      <HomePageTop
        streamIsLive={streamIsLive}
        schedules={schedules}
        homePageRandomMix={homePageRandomMix}
      />
      <HomePageContent {...rest} />
    </main>
  );
};

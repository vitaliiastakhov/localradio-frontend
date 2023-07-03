import { Maybe } from 'yup';
import { ScheduleQuery } from '@/entities/schedule/api/schedule.graphql.interface';
import { HomepageQuery } from '../api/home-page.graphql.interface';
import { HomePageRandomMixQuery } from '../api/home-page-random-mix.graphql.interface';

export interface HomePageProps extends HomepageQuery {
  homePageRandomMix?: HomePageRandomMixQuery['homePageRandomMix'];
  schedules?: ScheduleQuery['eventSchedulesFixed'];
  streamIsLive?: Maybe<boolean>;
  error?: boolean;
}

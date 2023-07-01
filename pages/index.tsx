import type { GetServerSidePropsResult, NextPage } from 'next';
import { GetServerSideProps } from 'next/types';
import { defaultMixes, defaultReleases } from '@/defaults/defaults';
import { HomepageDocument } from '@/pages/home/api/home-page.graphql.interface';
import { HomePageRandomMixDocument } from '@/pages/home/api/home-page-random-mix.graphql.interface';
import { HomePage, HomePageProps } from '@/pages/home/ui/home-page';
import { client } from '@/shared/api/apollo/apollo-client';
import { Seo } from '@/shared/ui/seo/seo';
import { StreamIsLiveDocument } from '@/widgets/players/stream/api/stream-is-live.graphql.interface';
import { fetchEventSchedulesFixed } from './api/schedule';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Page: NextPage<HomePageProps> = (props) => {
  return (
    <>
      <Seo />
      <HomePage {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
}): Promise<GetServerSidePropsResult<HomePageProps>> => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  try {
    const {
      data: { mixes, releases, shopItems, events, genres, moods },
    } = await client.query({
      query: HomepageDocument,
    });

    const {
      data: { homePageRandomMix },
    } = await client.query({
      query: HomePageRandomMixDocument,
      fetchPolicy: 'no-cache',
    });

    const eventSchedulesFixed = await fetchEventSchedulesFixed();

    const {
      data: { streamIsLive },
    } = await client.query({
      query: StreamIsLiveDocument,
      fetchPolicy: 'no-cache',
    });

    return {
      props: {
        streamIsLive,
        mixes,
        releases,
        shopItems,
        events,
        moods,
        genres,
        schedules: eventSchedulesFixed,
        homePageRandomMix,
      },
    };
  } catch (error) {
    const rndMixInt = randomIntFromInterval(0, defaultMixes.data.length - 1);
    const randomMix = defaultMixes.data[rndMixInt];
    return {
      props: {
        mixes: defaultMixes,
        releases: defaultReleases,
        homePageRandomMix: {
          data: randomMix,
        },
      },
    };
  }
};

export default Page;

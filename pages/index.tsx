import type { NextPage } from 'next';
import { GetServerSideProps } from 'next/types';
import { HomepageDocument } from '@/pages/home/api/home-page.graphql.interface';
import { HomePageRandomMixDocument } from '@/pages/home/api/home-page-random-mix.graphql.interface';
import { HomePage, HomePageProps } from '@/pages/home/ui/home-page';
import { client } from '@/shared/api/apollo/apollo-client';
import { Seo } from '@/shared/ui/seo/seo';
import { StreamIsLiveDocument } from '@/widgets/players/stream/api/stream-is-live.graphql.interface';
import { fetchEventSchedulesFixed } from './api/schedule';

const Page: NextPage<HomePageProps> = (props) => {
  return (
    <>
      <Seo />
      <HomePage {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

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
      latest: mixes?.data,
      releases: releases?.data,
      shopItems: shopItems?.data,
      events: events?.data,
      moods: moods?.data,
      genres: genres?.data,
      schedules: eventSchedulesFixed,
      homePageRandomMix: homePageRandomMix?.data,
    },
  };
};

export default Page;

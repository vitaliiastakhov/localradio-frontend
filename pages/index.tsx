import type { GetServerSidePropsResult, NextPage } from 'next';
import { GetServerSideProps } from 'next/types';
import { defaultMixes, defaultReleases } from '@/defaults/defaults';
import { getHomePageData } from '@/pages/home/api/get-home-page-data';
import { HomePage } from '@/pages/home/ui/home-page';
import { HomePageProps } from '@/pages/home/ui/home-page.interface';
import { randomIntFromInterval } from '@/shared/lib/random-int-from-iterval';
import { Seo } from '@/shared/ui/seo/seo';

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
    const data = await getHomePageData();

    return {
      props: data,
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

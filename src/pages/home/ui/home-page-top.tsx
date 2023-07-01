import { useUnit } from 'effector-react';
import dynamic from 'next/dynamic';
import useSWR, { useSWRConfig } from 'swr';
import { $currentMixPlayer } from '@/features/toggle-mix-player/model/current-mix-player.model';
import { TogglePlayerLinks } from '@/features/toggle-mix-player/model/types';
import { clsxm } from '@/shared/lib/clsxm';
import SWRfetcher from '@/shared/lib/swr-fetcher';
import { StreamIsLiveQuery } from '@/widgets/players/stream/api/stream-is-live.graphql.interface';
import { HomePageProps } from './home-page';
import { HomePageToggle } from './home-page-toggle';
import { HomePageTopInfo } from './home-page-top-info';

export type HomePageTopProps = Pick<
  HomePageProps,
  'homePageRandomMix' | 'schedules' | 'streamIsLive'
>;

const ScheduleList = dynamic(() =>
  import('@/entities/schedule/ui/schedule-list').then(
    (module) => module.ScheduleList
  )
);

interface StreamData extends StreamIsLiveQuery {
  error?: string;
}

export const HomePageTop = (props: HomePageTopProps) => {
  const { homePageRandomMix, schedules, streamIsLive } = props;

  const { currentMixPlayer } = useUnit({
    currentMixPlayer: $currentMixPlayer,
  });
  const { mutate: refetchStream } = useSWRConfig();
  const { data: streamData } = useSWR<StreamData>(
    '/api/stream-is-live',
    SWRfetcher
  );

  const attributes = homePageRandomMix?.data?.attributes;

  const links: TogglePlayerLinks = {
    soundcloud: attributes?.linksToMixes?.soundcloudLink,
    youtube: attributes?.linksToMixes?.youtubeLink,
  };

  return (
    <section
      className={clsxm(
        'flex flex-col overflow-hidden border-b-2 border-black lg:grid lg:h-[calc(100vh-var(--header-height))]',
        {
          'lg:grid-cols-[1fr,0]': schedules?.length === 0 || !schedules,
        },
        {
          'lg:grid-cols-[1fr,minmax(25%,min-content)] 4xl:grid-cols-[1fr,minmax(20%,min-content)]':
            schedules && schedules.length > 0,
        }
      )}
    >
      <div className='h-full lg:grid  lg:grid-rows-[1fr,min-content]'>
        <div className='flex h-full max-w-[100vw] flex-col overflow-hidden'>
          <HomePageToggle
            schedulesExist={schedules?.length === 0 || !schedules}
            streamData={streamData}
            refetchStream={refetchStream('/api/streamIsLive')}
            streamIsLive={streamIsLive}
            homePageRandomMix={homePageRandomMix}
          />

          {attributes && (!streamData?.streamIsLive || !streamIsLive) && (
            <HomePageTopInfo
              schedulesExist={schedules ? schedules.length > 0 : false}
              links={links}
              currentMixPlayer={currentMixPlayer}
              homePageRandomMix={homePageRandomMix}
            />
          )}
        </div>
      </div>

      {schedules && schedules.length > 0 && (
        <div className='flex h-full flex-col  overflow-hidden bg-black lg:gap-2 lg:p-1.5 2xl:p-2'>
          <ScheduleList
            schedules={schedules}
            isStreaming={streamData?.streamIsLive}
          />
        </div>
      )}
    </section>
  );
};

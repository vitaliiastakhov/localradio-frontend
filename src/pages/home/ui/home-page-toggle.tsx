import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import type { ScopedMutator } from 'swr/_internal';
import { $currentMixPlayer } from '@/features/toggle-mix-player/model/current-mix-player.model';
import {
  SCToggleElement,
  YoutubeToggleElement,
} from '@/features/toggle-mix-player/ui';
import { clsxm } from '@/shared/lib/clsxm';
import {
  REFETCH_STREAM_IN_MS,
  YOUTUBE_LIVE_LINK,
} from '@/shared/lib/constants/common';
import { Icon } from '@/shared/ui/icons';
import type { StreamIsLiveQuery } from '@/widgets/players/stream/api/stream-is-live.graphql.interface';
import type { HomePageTopProps } from './home-page-top';

interface HomePageToggleProps extends Omit<HomePageTopProps, 'schedules'> {
  refetchStream: Promise<ScopedMutator<any> | undefined>;
  streamData?: StreamIsLiveQuery;
  schedulesExist: boolean;
}

export const HomePageToggle = ({
  homePageRandomMix,
  streamData,
  streamIsLive,
  schedulesExist,
  refetchStream,
}: HomePageToggleProps) => {
  const attributes = homePageRandomMix?.attributes;
  const [SCLink, setSCLink] = useState<string | null>(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentMixPlayer } = useUnit({
    currentMixPlayer: $currentMixPlayer,
  });
  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setInterval(() => {
      refetchStream;
    }, REFETCH_STREAM_IN_MS);
  }, [refetchStream]);

  useEffect(() => {
    !streamData?.streamIsLive && attributes?.linksToMixes?.youtubeLink
      ? setYoutubeLink(attributes.linksToMixes.youtubeLink)
      : setYoutubeLink(YOUTUBE_LIVE_LINK);
    attributes?.linksToMixes?.soundcloudLink &&
      setSCLink(attributes.linksToMixes.soundcloudLink);
  }, [streamData?.streamIsLive, attributes]);

  return (
    <div
      className={clsxm(
        'relative aspect-video flex-1 bg-black lg:aspect-auto lg:pl-1.5 lg:pt-1.5 2xl:pl-2 2xl:pt-2',
        { 'lg:pr-1.5 2xl:pr-2': schedulesExist }
      )}
    >
      {(isLoading || !youtubeLink) && !streamData?.streamIsLive && (
        <div className='absolute inset-0 top-0 flex items-center justify-center px-1.5 py-9 text-white md:px-3 lg:px-3.5 '>
          <Icon.Loader />
        </div>
      )}

      {(streamIsLive || streamData?.streamIsLive) && (
        <iframe
          title='youtube live'
          id='ytplayer'
          itemType='text/html'
          width='100%'
          height='100%'
          src={YOUTUBE_LIVE_LINK}
        />
      )}
      {(!streamIsLive || !streamData?.streamIsLive) && youtubeLink && (
        <YoutubeToggleElement
          page='home'
          youtubeVideoLink={youtubeLink}
          className={`absolute inset-0 ${
            currentMixPlayer === 'audio'
              ? 'pointer-events-none bg-black/60 backdrop-blur-md backdrop-opacity-80'
              : ''
          } `}
        />
      )}
      {homePageRandomMix && !streamData?.streamIsLive && SCLink && (
        <SCToggleElement page='home' mix={homePageRandomMix} SCLink={SCLink} />
      )}
    </div>
  );
};

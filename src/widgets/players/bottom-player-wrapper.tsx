import { useUnit } from 'effector-react';
import { useEffect, useMemo, useState } from 'react';
import { $currentGlobalPlayer } from '@/features/choose-global-player/model/current-global-player.model';
import {
  $currentSCLink,
  $isOpenedWidget,
  $isSCPlaying,
} from './soundcloud/model/soundcloud.model';
import { SCPlayer } from './soundcloud/ui/sc-player';
import { StreamPlayer } from './stream/ui/stream-audio';
import { $currentYoutubeLink } from './youtube/model/youtube.model';
import { YoutubeBottomPlayer } from './youtube/ui/youtube-bottom-player';

export const BottomPlayerWrapper = () => {
  const baseClasses = 'fixed bottom-0 transition duration-200 ease-out';
  const [bottomPlayerClasses, setBottomPlayerClasses] = useState(baseClasses);

  const {
    currentSCLink,
    currentYoutubeLink,
    isOpenedScWidget,
    currentGlobalPlayer,
    isSCPlaying,
  } = useUnit({
    currentSCLink: $currentSCLink,
    currentYoutubeLink: $currentYoutubeLink,
    currentGlobalPlayer: $currentGlobalPlayer,
    isOpenedScWidget: $isOpenedWidget,
    isSCPlaying: $isSCPlaying,
  });

  const playerTranslateStyles = useMemo(() => {
    if (
      (currentGlobalPlayer === 'soundcloud' ||
        isSCPlaying ||
        currentGlobalPlayer === 'youtubeBottom') &&
      isOpenedScWidget
    )
      return 'translate-y-0';
    if (
      currentGlobalPlayer !== 'soundcloud' &&
      currentGlobalPlayer !== 'youtubeBottom'
    )
      return 'translate-y-[400%]';
    return 'translate-y-full';
  }, [currentGlobalPlayer, isSCPlaying, isOpenedScWidget]);

  const playerPositionStyles = useMemo(() => {
    if (currentGlobalPlayer === 'soundcloud') return ' left-0 right-0 w-full';
    return 'right-0 w-fit';
  }, [currentGlobalPlayer]);

  useEffect(() => {
    setBottomPlayerClasses(
      [baseClasses, playerPositionStyles, playerTranslateStyles].join(' ')
    );
  }, [playerPositionStyles, playerTranslateStyles]);

  return (
    <div className={bottomPlayerClasses}>
      <StreamPlayer />
      {currentGlobalPlayer === 'soundcloud' && currentSCLink && <SCPlayer />}
      {currentGlobalPlayer === 'youtubeBottom' && currentYoutubeLink && (
        <YoutubeBottomPlayer />
      )}
    </div>
  );
};

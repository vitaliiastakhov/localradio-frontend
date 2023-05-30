import { useUnit } from 'effector-react';
import { useCallback, useEffect, useRef } from 'react';
import { $currentGlobalPlayer } from '@/features/choose-global-player/model/current-global-player.model';
import { ICECAST_URL } from '@/shared/config/environment';
import {
  $isClickedStreamPlay,
  $isStreamLoaded,
  isClickedStreamPlayEv,
  isStreamLoadedEv,
} from '../model/stream';

export const StreamPlayer = () => {
  const {
    isStreamLoaded,
    isStreamPlayed,
    currentGlobalPlayer,
    isClickedStreamPlay,
    isStreamLoadedEvent,
  } = useUnit({
    isStreamLoaded: $isStreamLoaded,
    isStreamPlayed: $isClickedStreamPlay,
    currentGlobalPlayer: $currentGlobalPlayer,
    isClickedStreamPlay: isClickedStreamPlayEv,
    isStreamLoadedEvent: isStreamLoadedEv,
  });

  const audioPlayer = useRef<HTMLAudioElement>(null);

  const play = () => {
    audioPlayer.current!.volume = 1;
    audioPlayer.current?.play();
  };

  const pause = useCallback(() => {
    audioPlayer.current!.pause();
    isClickedStreamPlay(false);
  }, [isClickedStreamPlay]);

  useEffect(() => {
    currentGlobalPlayer !== 'stream' && pause();
  }, [currentGlobalPlayer, pause]);

  useEffect(() => {
    isStreamLoaded && isStreamPlayed ? play() : pause();
  }, [isStreamLoaded, isStreamPlayed, pause]);

  return (
    <audio
      src={ICECAST_URL + '/live'}
      ref={audioPlayer}
      onLoadedMetadata={() => isStreamLoadedEvent(true)}
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
};

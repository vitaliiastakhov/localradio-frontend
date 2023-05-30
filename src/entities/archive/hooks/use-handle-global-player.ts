import { useUnit } from 'effector-react';
import { useCallback } from 'react';
import {
  type CurrentGlobalPlayer,
  setCurrentGlobalPlayerEv,
} from '@/features/choose-global-player/model/current-global-player.model';
import { fetchRandomMixesFx } from '@/widgets/players/soundcloud/model/sc-random-mixes.model';
import {
  isClickedPlayScEv,
  setCurrentScLinkEv,
  setIsSCPlayingEv,
} from '@/widgets/players/soundcloud/model/soundcloud.model';
import {
  isClickedPlayYoutubeEv,
  setCurrentYoutubeLinkEv,
  setIsYoutubePlayingEv,
} from '@/widgets/players/youtube/model/youtube.model';

export interface HandleGlobalPlayerResponse {
  handlePlay: ({
    type,
    link,
    currentLink,
    isPlaying,
  }: {
    type: CurrentGlobalPlayer;
    link?: string | null | undefined;
    currentLink?: string | null | undefined;
    isPlaying: boolean;
  }) => void;
}

export const useHandleGlobalPlayer = ({
  id,
}: {
  id?: string | number | null;
}): HandleGlobalPlayerResponse => {
  const {
    setCurrentScLink,
    setCurrentGlobalPlayer,
    setIsClickedPlaySc,
    setSCIsPlaying,
    fetchRandomMixes,
    setCurrentYoutubeLink,
    setIsYoutubePlaying,
    setIsClickedPlayYoutube,
  } = useUnit({
    setCurrentScLink: setCurrentScLinkEv,
    setCurrentGlobalPlayer: setCurrentGlobalPlayerEv,
    setIsClickedPlaySc: isClickedPlayScEv,
    setSCIsPlaying: setIsSCPlayingEv,
    fetchRandomMixes: fetchRandomMixesFx,
    setCurrentYoutubeLink: setCurrentYoutubeLinkEv,
    setIsYoutubePlaying: setIsYoutubePlayingEv,
    setIsClickedPlayYoutube: isClickedPlayYoutubeEv,
  });

  const handlePlay = useCallback(
    ({
      type,
      link,
      currentLink,
      isPlaying,
    }: {
      type: CurrentGlobalPlayer;
      link?: string | null;
      currentLink?: string | null;
      isPlaying: boolean;
    }) => {
      setCurrentGlobalPlayer(type);
      if (type === 'youtubeBottom') setCurrentYoutubeLink(link);

      if (type === 'soundcloud') {
        id && fetchRandomMixes(id);
        setCurrentScLink(link);
      }
      if (link === currentLink && isPlaying) {
        if (type === 'soundcloud') {
          setSCIsPlaying(false);
          setIsClickedPlaySc(false);
        }
        if (type === 'youtubeBottom') {
          setIsYoutubePlaying(false);
          setIsClickedPlayYoutube(false);
        }
      } else if (link === currentLink && !isPlaying) {
        if (type === 'soundcloud') setIsClickedPlaySc(true);

        if (type === 'youtubeBottom') setIsClickedPlayYoutube(true);
      } else {
        if (type === 'soundcloud') setIsClickedPlaySc(true);

        if (type === 'youtube') setIsClickedPlayYoutube(true);
      }
    },
    [
      id,
      setIsClickedPlayYoutube,
      setCurrentYoutubeLink,
      setSCIsPlaying,
      setIsClickedPlaySc,
      setCurrentGlobalPlayer,
      setCurrentScLink,
      fetchRandomMixes,
      setIsYoutubePlaying,
    ]
  );

  return { handlePlay };
};

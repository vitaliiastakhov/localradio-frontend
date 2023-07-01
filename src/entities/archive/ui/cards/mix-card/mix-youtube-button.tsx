import { useUnit } from 'effector-react';
import { useCallback } from 'react';
import {
  $isClickedPlaySc,
  $linkToMix,
} from '@/widgets/players/soundcloud/model/soundcloud.model';
import {
  $currentYoutubeLink,
  $isClickedPlayYoutube,
  $isYoutubePlaying,
} from '@/widgets/players/youtube/model/youtube.model';
import { MixButtonProps } from './mix-card';
import { MixCardButtonWithMemo } from './mix-card-button';

export const MixYoutubeButton = ({
  sizeVariant,
  attributes,
  play,
}: MixButtonProps) => {
  const {
    linkToMix,
    isClickedPlayYoutube,
    isYoutubePlaying,
    currentYoutubeLink,
  } = useUnit({
    isClickedPlaySc: $isClickedPlaySc,
    linkToMix: $linkToMix,
    currentYoutubeLink: $currentYoutubeLink,
    isClickedPlayYoutube: $isClickedPlayYoutube,
    isYoutubePlaying: $isYoutubePlaying,
  });

  const playYoutube = useCallback(() => {
    play({
      type: 'youtubeBottom',
      isPlaying: isYoutubePlaying,
      link: attributes?.linksToMixes?.youtubeLink,
      currentLink: currentYoutubeLink,
    });
  }, [play, attributes, isYoutubePlaying, currentYoutubeLink]);

  return (
    <MixCardButtonWithMemo
      variant='youtube'
      sizeVariant={sizeVariant}
      ariaLabel='Play and pause soundcloud player'
      isClickedPlay={isClickedPlayYoutube}
      isClicked={linkToMix === attributes?.slug && isYoutubePlaying}
      onClick={playYoutube}
    />
  );
};

import { useUnit } from 'effector-react';
import { useCallback } from 'react';
import { Maybe } from 'yup';
import { GlobalPlayerAction } from '@/entities/archive/hooks/use-global-player.hook';
import { SizeVariant } from '@/shared/types/size-variant.interface';
import {
  $isClickedPlaySc,
  $linkToMix,
} from '@/widgets/players/soundcloud/model/soundcloud.model';
import {
  $currentYoutubeLink,
  $isClickedPlayYoutube,
  $isYoutubePlaying,
} from '@/widgets/players/youtube/model/youtube.model';
import { MixCardButtonWithMemo } from './mix-card-button';

export interface MixButtonProps {
  sizeVariant: SizeVariant;
  slug: Maybe<string>;
  mixLink?: string;
  play: GlobalPlayerAction['play'];
}

export const MixYoutubeButton = ({
  sizeVariant,
  slug,
  mixLink,
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
      link: mixLink,
      currentLink: currentYoutubeLink,
    });
  }, [play, mixLink, isYoutubePlaying, currentYoutubeLink]);

  return (
    <MixCardButtonWithMemo
      variant='youtube'
      sizeVariant={sizeVariant}
      ariaLabel='Play and pause soundcloud player'
      isClickedPlay={isClickedPlayYoutube}
      isClicked={linkToMix === slug && isYoutubePlaying}
      onClick={playYoutube}
    />
  );
};

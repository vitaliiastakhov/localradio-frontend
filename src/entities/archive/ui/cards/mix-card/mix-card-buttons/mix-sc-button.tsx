import { useUnit } from 'effector-react';
import { useCallback } from 'react';
import { setCurrentGlobalPlayerEv } from '@/features/choose-global-player/model/current-global-player.model';
import {
  $currentSCLink,
  $isClickedPlaySc,
  $isSCPlaying,
  $linkToMix,
  setCurrentScLinkEv,
  setLinkToMixEv,
} from '@/widgets/players/soundcloud/model/soundcloud.model';
import { MixCardButtonWithMemo } from './mix-card-button';
import { MixButtonProps } from './mix-youtube-button';

export const MixSCButton = ({
  sizeVariant,
  mixLink,
  slug,
  play,
}: MixButtonProps) => {
  const {
    linkToMix,
    isClickedPlaySc,
    setLinkToMix,
    SCIsPlaying,
    currentSCLink,
    setCurrentGlobalPlayer,
    setCurrentScLink,
  } = useUnit({
    isClickedPlaySc: $isClickedPlaySc,
    linkToMix: $linkToMix,
    setLinkToMix: setLinkToMixEv,
    currentSCLink: $currentSCLink,
    SCIsPlaying: $isSCPlaying,
    setCurrentGlobalPlayer: setCurrentGlobalPlayerEv,
    setCurrentScLink: setCurrentScLinkEv,
  });

  const playSC = useCallback(() => {
    slug && setLinkToMix(slug);
    play({
      type: 'soundcloud',
      isPlaying: SCIsPlaying,
      link: mixLink,
      currentLink: currentSCLink,
    });
  }, [play, mixLink, SCIsPlaying, currentSCLink, setLinkToMix]);

  const playSCBottom = useCallback(() => {
    setCurrentGlobalPlayer('soundcloud');
    slug && setLinkToMix(slug);
    mixLink && setCurrentScLink(mixLink);
  }, [mixLink, slug, setCurrentScLink, setLinkToMix, setCurrentGlobalPlayer]);

  const handleClick = () => {
    sizeVariant === 'small' ? playSCBottom() : playSC();
  };

  return (
    <MixCardButtonWithMemo
      variant='soundcloud'
      sizeVariant={sizeVariant}
      ariaLabel='Play and pause soundcloud player'
      isClickedPlay={isClickedPlaySc}
      isClicked={linkToMix === slug && SCIsPlaying}
      onClick={handleClick}
    />
  );
};

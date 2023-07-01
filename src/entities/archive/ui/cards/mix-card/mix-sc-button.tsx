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
import { MixButtonProps } from './mix-card';
import { MixCardButtonWithMemo } from './mix-card-button';

interface MixSCButtonProps extends MixButtonProps {
  soundcloudLink: string;
}

export const MixSCButton = ({
  sizeVariant,
  soundcloudLink,
  attributes,
  play,
}: MixSCButtonProps) => {
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
    attributes?.slug && setLinkToMix(attributes.slug);
    play({
      type: 'soundcloud',
      isPlaying: SCIsPlaying,
      link: attributes?.linksToMixes?.soundcloudLink,
      currentLink: currentSCLink,
    });
  }, [play, attributes, SCIsPlaying, currentSCLink, setLinkToMix]);

  const playSCBottom = useCallback(() => {
    setCurrentGlobalPlayer('soundcloud');
    attributes?.slug && setLinkToMix(attributes.slug);
    soundcloudLink && setCurrentScLink(soundcloudLink);
  }, [
    soundcloudLink,
    attributes?.slug,
    setCurrentScLink,
    setLinkToMix,
    setCurrentGlobalPlayer,
  ]);

  const handleClick = () => {
    sizeVariant === 'small' ? playSCBottom() : playSC();
  };

  return (
    <MixCardButtonWithMemo
      variant='soundcloud'
      sizeVariant={sizeVariant}
      ariaLabel='Play and pause soundcloud player'
      isClickedPlay={isClickedPlaySc}
      isClicked={linkToMix === attributes?.slug && SCIsPlaying}
      onClick={handleClick}
    />
  );
};

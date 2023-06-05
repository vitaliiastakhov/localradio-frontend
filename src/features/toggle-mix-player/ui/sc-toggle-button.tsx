import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { FC, HTMLAttributes, useCallback } from 'react';
import { Maybe } from 'yup';
import { setCurrentGlobalPlayerEv } from '@/features/choose-global-player/model/current-global-player.model';
import { MixEntity } from '@/shared/api/graphql/__generated__/schema.graphql';
import { clsxm } from '@/shared/lib/clsxm';
import { Button } from '@/shared/ui/button/button';
import { Icon } from '@/shared/ui/icons';
import { fetchRandomMixesFx } from '@/widgets/players/soundcloud/model/sc-random-mixes.model';
import {
  $currentSCLink,
  $isSCPlaying,
  $linkToMix,
  isClickedPlayScEv,
  setCurrentScLinkEv,
  setIsSCPlayingEv,
  setLinkToMixEv,
} from '@/widgets/players/soundcloud/model/soundcloud.model';
import { SCToggleElementProps } from './sc-toggle-element';

interface SCToggleButtonProps
  extends Pick<SCToggleElementProps, 'SCLink'>,
  HTMLAttributes<HTMLButtonElement> {
  attributes: Maybe<MixEntity['attributes']>;
  mixId: Maybe<string>;
}

export const SCToggleButton: FC<SCToggleButtonProps> = ({
  attributes,
  mixId,
  SCLink,
  className,
}) => {
  const {
    linkToMix,
    SCIsPlaying,
    setLinkToMix,
    setCurrentGlobalPlayer,
    setCurrentScLink,
    setIsClickedPlaySc,
    fetchRandomMixes,
    currentSCLink,
    setSCIsPlaying,
  } = useUnit({
    linkToMix: $linkToMix,
    currentSCLink: $currentSCLink,
    SCIsPlaying: $isSCPlaying,
    setLinkToMix: setLinkToMixEv,
    setCurrentScLink: setCurrentScLinkEv,
    setCurrentGlobalPlayer: setCurrentGlobalPlayerEv,
    setIsClickedPlaySc: isClickedPlayScEv,
    fetchRandomMixes: fetchRandomMixesFx,
    setSCIsPlaying: setIsSCPlayingEv,
  });

  const handlePlaySCButton = useCallback(() => {
    setCurrentGlobalPlayer('soundcloud');
    attributes?.slug && setLinkToMix(attributes.slug);
    if (
      attributes?.linksToMixes?.soundcloudLink === currentSCLink &&
      SCIsPlaying
    ) {
      setSCIsPlaying(false);
      setIsClickedPlaySc(false);
    } else if (
      attributes?.linksToMixes?.soundcloudLink === currentSCLink &&
      !SCIsPlaying
    ) {
      setIsClickedPlaySc(true);
    } else {
      setIsClickedPlaySc(true);
    }
    setCurrentScLink(SCLink);
    mixId && fetchRandomMixes(mixId);
  }, [
    SCLink,
    mixId,
    attributes,
    currentSCLink,
    SCIsPlaying,
    fetchRandomMixes,
    setIsClickedPlaySc,
    setCurrentGlobalPlayer,
    setLinkToMix,
    setCurrentScLink,
    setSCIsPlaying,
  ]);

  return (
    <Button
      type='button'
      aria-label='Play and pause soundcloud player'
      onClick={handlePlaySCButton}
      className={clsx(
        'group absolute flex aspect-square h-[clamp(2rem,8vw,2.5rem)] w-[clamp(2rem,8vw,2.5rem)] items-center justify-center overflow-hidden md:h-12 md:w-12 2xl:h-16 2xl:w-16',
        className
      )}
    >
      <div
        className={clsxm(
          'absolute inset-0 bg-white backdrop-invert transition  duration-150 hover:bg-white md:bg-opacity-75 md:backdrop-blur-[20px] md:backdrop-saturate-200',
          {
            'bg-opacity-100': linkToMix === attributes?.slug && SCIsPlaying,
          }
        )}
      />
      <div className='w-[0.9rem] 2xl:w-[1.2rem]'>
        {((linkToMix === attributes?.slug && !SCIsPlaying) ||
          linkToMix !== attributes?.slug) && (
            <div className='translate-x-[1px]'>
              <Icon.PlayIcon />
            </div>
          )}
        {linkToMix === attributes?.slug && SCIsPlaying && (
          <div className='translate-x-[1px]'>
            <Icon.PauseIcon />
          </div>
        )}
      </div>
    </Button >
  );
};

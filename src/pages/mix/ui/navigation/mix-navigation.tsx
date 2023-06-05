import { useUnit } from 'effector-react';
import { $currentMixPlayer } from '@/features/toggle-mix-player/model/current-mix-player.model';
import { TogglePlayerLinks } from '@/features/toggle-mix-player/model/types';
import {
  SCToggleElement,
  YoutubeToggleElement,
} from '@/features/toggle-mix-player/ui';
import { PlayerToggle } from '@/features/toggle-mix-player/ui/player-toggle';
import type {
  Maybe,
  MixEntity,
} from '@/shared/api/graphql/__generated__/schema.graphql';
import { MixSlideButton } from './mix-slide-button';

interface MixNavigationProps {
  siblingsSlug?: { prev?: Maybe<string>; next?: Maybe<string> };
  links: TogglePlayerLinks;
  mix: MixEntity;
}

export const MixNavigation = ({
  siblingsSlug,
  links,
  mix,
}: MixNavigationProps) => {
  const { currentMixPlayer } = useUnit({
    currentMixPlayer: $currentMixPlayer,
  });

  return (
    <>
      <div className='py-0.5 2xl:py-2'>
        <div className='flex h-fit flex-1 items-end gap-1 text-[0.8rem] font-medium   uppercase xl:text-[0.875rem]  2xl:text-[0.95rem]'>
          <MixSlideButton slug={siblingsSlug?.prev} direction='left' />
          <PlayerToggle links={links} currentMixPlayer={currentMixPlayer} />
          <MixSlideButton slug={siblingsSlug?.next} direction='right' />
        </div>
      </div>

      <div className='flex flex-col'>
        {links.youtube && (
          <YoutubeToggleElement youtubeVideoLink={links.youtube} page='mix' />
        )}
        {links.soundcloud && (
          <SCToggleElement page='mix' mix={mix} SCLink={links.soundcloud} />
        )}
      </div>
    </>
  );
};

import { useSCPlayer } from '@/features/toggle-mix-player/hooks/use-sc-toggle.hook';
import { MixButtonProps } from './mix-button.interface';
import { MixCardButtonWithMemo } from './mix-card-button';

export const MixSCButton = ({
  sizeVariant,
  mixLink,
  slug,
  id,
}: MixButtonProps) => {
  const { isActive, handlePlay } = useSCPlayer({
    slug,
    mixLink,
    mixId: id,
  });

  return (
    <MixCardButtonWithMemo
      variant='soundcloud'
      sizeVariant={sizeVariant}
      ariaLabel='Play and pause soundcloud player'
      onClick={handlePlay}
      active={isActive}
    />
  );
};

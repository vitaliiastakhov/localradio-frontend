import { useYoutubeBottomPlayer } from '@/features/toggle-mix-player/hooks/use-youtube-toggle.hook';
import { MixButtonProps } from './mix-button.interface';
import { MixCardButtonWithMemo } from './mix-card-button';

export const MixYoutubeButton = ({
  sizeVariant,
  slug,
  mixLink,
}: MixButtonProps) => {
  const { isActive, handlePlay } = useYoutubeBottomPlayer({
    slug,
    mixLink,
  });

  return (
    <MixCardButtonWithMemo
      variant='youtube'
      sizeVariant={sizeVariant}
      ariaLabel='Play and pause soundcloud player'
      onClick={handlePlay}
      active={isActive}
    />
  );
};

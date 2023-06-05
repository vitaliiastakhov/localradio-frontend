import { HTMLAttributes } from 'react';
import { clsxm } from '@/shared/lib/clsxm';
import { Button } from '@/shared/ui/button/button';
import type { CurrentMixPlayer } from '../model/current-mix-player.model';

interface PlayerToggleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  onClick: () => void;
  currentMixPlayer: CurrentMixPlayer;
  playerType: CurrentMixPlayer;
  text: string;
  active: boolean;
}

export const PlayerToggleButton = ({
  playerType,
  disabled = false,
  onClick,
  currentMixPlayer,
  text,
  active,
  ...rest
}: PlayerToggleButtonProps) => {
  return (
    <Button
      {...rest}
      colorVariant='clear'
      variant='clear'
      type='button'
      onClick={onClick}
      fullWidth
      disabled={disabled && !active}
      className={clsxm(
        'flex h-[clamp(1rem,6vw,1.5rem)] px-1 lg:pt-0.5 2xl:h-8 2xl:pt-0',
        { 'bg-black text-white hover:bg-white hover:text-black': !disabled },
        { 'bg-white text-black': !disabled && playerType === currentMixPlayer },
        { 'bg-secondary-dark hover:bg-secondary-light': !disabled && active }
      )}
    >
      {text}
    </Button>
  );
};

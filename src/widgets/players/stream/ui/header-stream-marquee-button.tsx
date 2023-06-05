import { useUnit } from 'effector-react';
import Marquee from 'react-fast-marquee';
import {
  $currentGlobalPlayer,
  setCurrentGlobalPlayerEv,
} from '@/features/choose-global-player/model/current-global-player.model';
import { clsxm } from '@/shared/lib/clsxm';
import {
  $isClickedStreamPlay,
  $streamTitle,
  isClickedStreamPlayEv,
} from '../model/stream';
import { HeaderStreamPlayerIcon } from './header-stream-player-icon';

interface HeaderStreamMarqueeButtonProps {
  disabled: boolean;
  streamIsAvailable: boolean;
  streamIsLoaded: boolean;
}

export const HeaderStreamMarqueeButton = ({
  disabled,
  streamIsAvailable,
  streamIsLoaded,
}: HeaderStreamMarqueeButtonProps) => {
  const {
    isClickedSteamPlay,
    currentGlobalPlayer,
    streamTitle,
    setCurrentGlobalPlayer,
    isClickedStreamPlayEvent,
  } = useUnit({
    isClickedSteamPlay: $isClickedStreamPlay,
    streamTitle: $streamTitle,
    currentGlobalPlayer: $currentGlobalPlayer,
    setCurrentGlobalPlayer: setCurrentGlobalPlayerEv,
    isClickedStreamPlayEvent: isClickedStreamPlayEv,
  });

  const handleClick = () => {
    setCurrentGlobalPlayer('stream');
    isClickedStreamPlayEvent(!isClickedSteamPlay);
  };

  return (
    <button
      type='button'
      disabled={disabled}
      onClick={handleClick}
      className={clsxm(
        'order-2 flex h-full w-full items-center uppercase transition-colors lg:order-1 2xl:gap-1',
        { 'cursor-default': !streamIsLoaded }
      )}
    >
      {streamIsAvailable && streamIsLoaded && (
        <div className='flex aspect-square items-center 2xl:aspect-auto'>
          <HeaderStreamPlayerIcon
            streamIsLoaded={streamIsLoaded}
            isClickedSteamPlay={isClickedSteamPlay}
            globalPlayerIsSteam={currentGlobalPlayer === 'stream'}
          />
        </div>
      )}
      <div className='flex w-full '>
        <Marquee pauseOnHover className='w-0 max-w-full' gradient={false}>
          <div className='flex w-fit overflow-hidden '>{streamTitle}</div>
        </Marquee>
      </div>
    </button>
  );
};

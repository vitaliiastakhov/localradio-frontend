import { clsxm } from '@/shared/lib/clsxm';
import { Icon } from '@/shared/ui/icons';
import { MixCardButtonProps } from './mix-card-button';

interface MixCardButtonIconProps extends Pick<MixCardButtonProps, 'variant'> {
  isClickedPlay: boolean;
  isClicked: boolean;
}

export const MixCardButtonIcon = ({
  isClicked,
  isClickedPlay,
  variant,
}: MixCardButtonIconProps) => {
  const MixCardButtonIconClasses = clsxm(
    ' h-[clamp(0.8rem,5vw,1.12rem)] w-[clamp(0.8rem,5vw,1.12rem)] opacity-100 lg:h-[1.12rem] lg:w-[1.12rem] 2xl:h-[1.3rem] 2xl:w-[1.3rem]',
    {
      ' fill-gray-color opacity-60 blur-[1px]': isClickedPlay && isClicked,
    },
    {
      ' group-hover/icon:opacity-0': !isClickedPlay || !isClicked,
    }
  );

  return (
    <div className='relative'>
      {variant === 'soundcloud' ? (
        <Icon.SCIcon className={MixCardButtonIconClasses} />
      ) : (
        <Icon.YoutubeIcon className={MixCardButtonIconClasses} />
      )}
    </div>
  );
};

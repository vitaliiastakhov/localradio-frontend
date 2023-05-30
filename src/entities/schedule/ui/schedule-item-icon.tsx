import clsx from 'clsx';
import type { FC, HTMLAttributes } from 'react';
import { Icon } from '@/shared/ui/icons';
import { ScheduleIconWrapper } from './schedule-icon-wrapper';

interface ScheduleItemIconProps extends HTMLAttributes<HTMLDivElement> {
  variant: 'info' | 'local' | null;
}

export const ScheduleItemIcon: FC<ScheduleItemIconProps> = ({
  variant,
  className,
}) => {
  if (variant === 'local')
    return (
      <ScheduleIconWrapper
        className={clsx(
          'h-full fill-black [&>*]:-translate-x-[1px]',
          className
        )}
      >
        <Icon.LogoShortIcon className='h-3 lg:h-[18px]' />
      </ScheduleIconWrapper>
    );

  if (variant === 'info')
    return (
      <ScheduleIconWrapper
        className={clsx(
          'h-full font-semibold [&>*]:-translate-x-[1px]',
          className
        )}
      >
        <span>!</span>
      </ScheduleIconWrapper>
    );
  return null;
};

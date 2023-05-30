import { HTMLAttributes, memo } from 'react';
import { clsxm } from '@/shared/lib/clsxm';

type ScheduleIconWrapper = HTMLAttributes<HTMLDivElement>;

export const ScheduleIconWrapper = memo(
  ({ children, className }: ScheduleIconWrapper) => {
    return (
      <div
        className={clsxm(
          'flex min-w-[30px] items-center justify-center  border-l border-inherit  py-[6px] lg:min-w-[40px]',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

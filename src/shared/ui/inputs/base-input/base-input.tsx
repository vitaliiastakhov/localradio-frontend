import clsx from 'clsx';
import { forwardRef } from 'react';
import { BaseInputProps } from '../types/types';

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const { error, className, ...rest } = props;
    return (
      <input
        ref={ref}
        className={clsx(
          'h-[32px] w-full rounded-lg border bg-white/70 px-2 font-normal text-black outline-primary backdrop-blur transition-all placeholder:font-normal placeholder:text-black/30 lg:h-[42px] lg:px-2.5',
          {
            'border-red-color': error,
          },
          { 'border-transparent': !error },
          className
        )}
        {...rest}
      />
    );
  }
);

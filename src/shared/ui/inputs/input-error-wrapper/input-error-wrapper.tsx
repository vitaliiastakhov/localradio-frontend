import { forwardRef } from 'react';
import { BaseInput } from '../base-input';
import { BaseInputProps } from '../types/types';

export const InputErrorWrapper = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const { error, children, className, ...rest } = props;
    return (
      <div className='grid'>
        {children ? children : <BaseInput ref={ref} error={error} {...rest} />}
        {error && (
          <span className='pt-1 text-[13px] font-light leading-none text-red-color sm:text-[15px]'>
            {error}
          </span>
        )}
      </div>
    );
  }
);

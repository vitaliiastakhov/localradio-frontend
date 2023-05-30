import { useUncontrolled } from '@mantine/hooks';
import clsx from 'clsx';
import type { FocusEvent } from 'react';
import { useCallback, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { createView } from '@/shared/lib/view';
import { InputErrorWrapper } from '../input-error-wrapper';
import { PhoneInputProps } from '../types/types';

const PhoneInput = createView<PhoneInputProps>()
  .displayName('PhoneInput')
  .map((props) => {
    const {
      inputRef,
      value: passedValue,
      onFocus,
      onBlur,
      defaultValue,
      onChange,
      ...rest
    } = props;

    const [focused, setFocused] = useState(false);

    const [value, handleChange] = useUncontrolled({
      value: passedValue,
      defaultValue,
      finalValue: '',
      onChange,
    });

    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (typeof onFocus === 'function') {
          onFocus(e);
        }
        setFocused(true);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (typeof onBlur === 'function') {
          onBlur(e);
        }
        setFocused(false);
      },
      [onBlur]
    );

    return {
      inputRef,
      value,
      handleChange,
      handleFocus,
      handleBlur,
      ...rest,
    };
  })
  .memo()
  .view(
    ({
      inputRef,
      value,
      error,
      handleChange,
      placeholder,
      handleFocus,
      handleBlur,
      ...rest
    }) => {
      return (
        <InputErrorWrapper error={error}>
          <IMaskInput
            {...rest}
            mask='+7 (000) 000-00-00'
            placeholder={placeholder}
            autoComplete='tel'
            unmask={false}
            value={value}
            inputMode='numeric'
            inputRef={inputRef}
            onChange={(e) => e.preventDefault()}
            onAccept={(value, masked) => {
              handleChange(masked.value);
            }}
            className={clsx(
              'h-[32px] w-full rounded-lg border bg-white/70 px-2 font-normal text-black outline-primary backdrop-blur transition-all placeholder:font-normal placeholder:text-black/30 lg:h-[42px] lg:px-2.5',
              {
                'border-red-color': error,
              },
              { 'border-transparent': !error }
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </InputErrorWrapper>
      );
    }
  ).Memo;
export { PhoneInput };
export type { PhoneInputProps };

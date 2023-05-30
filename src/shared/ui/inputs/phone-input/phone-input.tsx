import { useUncontrolled } from '@mantine/hooks';
import type { ChangeEvent, FocusEvent } from 'react';
import { useCallback, useState } from 'react';
import InputMask from 'react-input-mask';
import { createView } from '@/shared/lib/view';
import { BaseInput } from '../base-input';
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
      rest,
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
      rest,
    }) => (
      <InputErrorWrapper error={error}>
        <InputMask
          mask='+7 (999) 999-99-99'
          placeholder={placeholder}
          ref={inputRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange(event.currentTarget.value)
          }
          {...rest}
          value={value}
          inputMode='numeric'
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <BaseInput error={error} />
        </InputMask>
      </InputErrorWrapper>
    )
  ).Memo;
export { PhoneInput };
export type { PhoneInputProps };

import { useUncontrolled } from '@mantine/hooks';
import type { FocusEvent } from 'react';
import { useCallback, useState } from 'react';
import { createView } from '@/shared/lib/view';
import { InputErrorWrapper } from '../input-error-wrapper';
import { InputProps } from '../types/types';

const TextInput = createView<InputProps>()
  .displayName('TextInput')

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
      error,
      value,
      handleChange,
      handleFocus,
      handleBlur,
      ...rest
    }) => (
      <InputErrorWrapper
        {...rest}
        ref={inputRef}
        value={value}
        onChange={(event) => handleChange(event.currentTarget.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={error}
      />
    )
  ).Memo;

export { TextInput };

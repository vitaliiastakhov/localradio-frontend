import type { Controller } from 'effector-react-form';
import type { ChangeEvent, ComponentType } from 'react';

export function createField<P, Keys extends string = ''>(
  Component: ComponentType<P>,
  skippedFieldProps?: (keyof ReturnType<Controller>)[]
) {
  return function ({ use, ...props }: Omit<P, Keys> & { use: Controller }) {
    const { input, error, isShowError } = use();

    const fieldProps = {
      error: isShowError && error,
      ...input,
    };

    if (skippedFieldProps) {
      for (const prop of skippedFieldProps) {
        delete fieldProps[prop as unknown as keyof typeof fieldProps];
      }
    }

    return (
      <Component
        {...(props as any)}
        {...fieldProps}
        value={fieldProps.value ?? ''}
      />
    );
  };
}

export function createSuggestField<P, Keys extends string = ''>(
  Component: ComponentType<P>,
  skippedFieldProps?: (keyof ReturnType<Controller>)[]
) {
  // eslint-disable-next-line func-names
  return function ({ use, ...props }: Omit<P, Keys> & { use: Controller }) {
    const { input, error, isShowError } = use();
    const { value, onChange, ...restInputProps } = input;

    const fieldProps = {
      error: isShowError && error,
      defaulQuery: value ?? '',
      inputProps: {
        onChange,
        value, // pass value here for updates on client
        ...restInputProps,
      },
      onChange: (e: any) => {
        onChange(e.value);
      },
    };

    if (skippedFieldProps) {
      for (const prop of skippedFieldProps) {
        delete fieldProps[prop as unknown as keyof typeof fieldProps];
      }
    }

    return <Component {...(props as any)} {...fieldProps} />;
  };
}

export function createBooleanField<P, Keys extends string = ''>(
  Component: ComponentType<P>,
  skippedFieldProps?: (keyof ReturnType<Controller>)[]
) {
  // eslint-disable-next-line func-names
  return function ({ use, ...props }: Omit<P, Keys> & { use: Controller }) {
    const { input, error, isShowError } = use();
    const { value, onChange, ...restInputProps } = input;

    const fieldProps = {
      error: isShowError && error,
      checked: Boolean(value),
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        onChange(event.currentTarget.checked),
      ...restInputProps,
    };

    if (skippedFieldProps) {
      for (const prop of skippedFieldProps) {
        delete fieldProps[prop as unknown as keyof typeof fieldProps];
      }
    }

    return <Component {...(props as any)} {...fieldProps} />;
  };
}

import { InputHTMLAttributes, ReactNode, RefObject } from 'react';
import type { ReactInputMask } from 'react-input-mask';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: ReactNode;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputRef?: RefObject<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
  error?: ReactNode;
}

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputRef?: RefObject<ReactInputMask>;
  value?: string;
  defaultValue?: string;
  error?: ReactNode;
  onChange?(value: string): void;
}

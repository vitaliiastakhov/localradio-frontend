import { PhoneInput, TextInput } from './adapters';
import { createField } from './create-field';
import { createObjectValidator } from './create-validator';

const Field = {
  TextInput,
  PhoneInput,
};

export { createField, createObjectValidator, Field };

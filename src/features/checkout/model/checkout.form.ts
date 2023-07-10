import { createForm } from 'effector-react-form';
import { string } from 'yup';
import { createObjectValidator } from '@/shared/form';
import { phoneRegex } from '@/shared/lib/constants/common';
import { InputProps } from '@/shared/ui/inputs/types/input.interface';
import { CheckoutForm } from './checkout-form.interface';

const minLengthMessage = (string: string) =>
  `${string} must be at least 2 characters`;
const requiredMessage = (string: string) => `${string} is required`;

export interface FormField extends Omit<InputProps, 'name'> {
  name: keyof CheckoutForm;
}

export const contactFormFields: FormField[] = [
  {
    name: 'firstName',
    autoComplete: 'given-name',
    placeholder: 'First name',
    required: true,
  },
  {
    name: 'lastName',
    autoComplete: 'family-name',
    placeholder: 'Last name',
    required: true,
  },
  {
    name: 'email',
    autoComplete: 'username',
    placeholder: 'Email',
    required: true,
    type: 'email',
  },
  {
    mask: '+{7} (000) 000-00-00',
    inputMode: 'numeric',
    type: 'tel',
    autoComplete: 'tel',
    placeholder: 'Phone',
    name: 'phone',
  },
];

export const regionFormFields: FormField[] = [
  {
    name: 'city',
    autoComplete: 'home city',
    required: true,
    placeholder: 'City',
  },
  {
    name: 'address',
    autoComplete: 'street-address',
    placeholder: 'Full Address',
    required: true,
  },
  {
    name: 'postcode',
    placeholder: 'Postcode',
    mask: '000000',
    inputMode: 'numeric',
    autoComplete: 'postal-code',
    type: 'number',
    required: true,
  },
];

export const checkoutForm = createForm<CheckoutForm>({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    postcode: '',
  },
  validate: createObjectValidator({
    firstName: string()
      .min(2, minLengthMessage('First name'))
      .required(requiredMessage('First name'))
      .nullable(),
    lastName: string()
      .min(2, minLengthMessage('Last name'))
      .required(requiredMessage('Last name'))
      .nullable(),
    email: string()
      .email('Email must be a valid')
      .required('Email is required')
      .nullable(),
    phone: string()
      .matches(phoneRegex, {
        message: 'Введите корректный номер телефона',
      })
      .required('Phone is a required field')
      .nullable(),
    city: string()
      .min(2, minLengthMessage('City'))
      .required('City is required')
      .nullable(),
    address: string()
      .min(2, minLengthMessage('address'))
      .required(requiredMessage('Full Address'))
      .nullable(),
    postcode: string()
      .required(requiredMessage('Postcode code'))
      .nullable()
      .length(6, 'Postcode must be 6 digits'),
  }),
});

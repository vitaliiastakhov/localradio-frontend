import { createEffect, sample } from 'effector';
import { createForm } from 'effector-react-form';
import { Maybe, string } from 'yup';
import { store } from '@/entities/store/factory/shop-factory.model';
import { $products } from '@/entities/store/items/model/shop.model';
import { createObjectValidator } from '@/shared/form';
import { phoneRegex } from '@/shared/lib/constants/common';
import { pushFx } from '@/shared/lib/effector-router';

const SUCCESS_URL = '/shop/success-order';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  postcode: string;
}

interface CreateOrder extends CheckoutForm {
  items: {
    product: Maybe<string>;
    quantity: Maybe<number>;
    title?: string;
  }[];
}

const checkout = store.domain('checkout');
export const setSuccessOrder = checkout.createEvent<boolean>();
export const $submitIsDisabled = checkout.createStore(true);
export const $submitted = checkout.createStore(false);

const createOrderFx = createEffect(
  async (order: { data: CreateOrder } | null) => {
    if (order) {
      const { data } = await fetch('/api/shop-order', {
        method: 'POST',
        body: JSON.stringify(order),
      }).then((res) => res.json());
      return data;
    }
  }
);

const minLengthMessage = (string: string) =>
  `${string} must be at least 2 characters`;
const requiredMessage = (string: string) => `${string} is required`;

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

sample({
  source: checkoutForm.$form,
  fn: (form) => form.hasError,
  target: $submitIsDisabled,
});

sample({
  source: { formState: checkoutForm.$form, products: $products },
  fn: ({ formState, products }) =>
    products.length > 0 &&
    formState.submitted &&
    !formState.hasError &&
    !formState.hasOuterError &&
    true,
  target: $submitted,
});

sample({
  clock: $submitted,
  source: { formValues: checkoutForm.$values, products: $products },
  fn: ({ formValues, products }, submitted): { data: CreateOrder } | null =>
    submitted && formValues && products
      ? {
          data: {
            ...formValues,
            items: products.map((product) => ({
              product: product.id,
              quantity: product.quantity,
            })),
          },
        }
      : null,
  target: createOrderFx,
});

sample({
  clock: createOrderFx.done,
  fn: (submitted) => submitted && { url: SUCCESS_URL },
  target: pushFx,
});

checkout.onCreateStore((store) => store.reset(setSuccessOrder));
$products.reset(setSuccessOrder);

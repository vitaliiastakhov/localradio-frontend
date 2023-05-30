import { useForm } from 'effector-react-form';
import { Field } from '@/shared/form';
import { checkoutForm } from '../../model/checkout.model';

export const ContactDetailsForm = () => {
  const { controller } = useForm({
    form: checkoutForm,
  });
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex '>
        <h5 className='text-[1.2rem] font-medium uppercase leading-none  md:text-[1.5rem] 2xl:text-[1.9rem]'>
          Contact details
        </h5>
      </div>

      <div className='grid gap-2 lg:gap-3.5 2xl:gap-3.5  '>
        <Field.TextInput
          placeholder='First name'
          use={controller({
            name: checkoutForm.getName('firstName'),
          })}
          required
        />
        <Field.TextInput
          placeholder='Last name'
          use={controller({
            name: checkoutForm.getName('lastName'),
          })}
          required
        />
        <Field.TextInput
          placeholder='Email'
          use={controller({
            name: checkoutForm.getName('email'),
          })}
          required
        />
        <Field.PhoneInput
          placeholder='Phone'
          use={controller({
            name: checkoutForm.getName('phone'),
          })}
        />
      </div>
    </div>
  );
};

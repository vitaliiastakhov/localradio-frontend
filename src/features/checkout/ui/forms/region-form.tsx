import { useForm } from 'effector-react-form';
import { Field } from '@/shared/form';
import { checkoutForm } from '../../model/checkout.model';

export const RegionForm = () => {
  const { controller } = useForm({
    form: checkoutForm,
  });

  return (
    <div className='grid gap-2'>
      <div className='flex '>
        <h5 className='text-[1.2rem] font-medium uppercase leading-none  md:text-[1.5rem] 2xl:text-[1.9rem]'>
          Select region
        </h5>
      </div>

      <div className='grid gap-2 lg:gap-3.5 2xl:gap-3.5  '>
        <Field.TextInput
          autoComplete='home city'
          required
          placeholder='City'
          aria-label='City'
          use={controller({
            name: checkoutForm.getName('city'),
          })}
          className='w-full'
        />
        <Field.TextInput
          autoComplete='street-address'
          required
          placeholder='Full Address'
          aria-label='Full Address'
          use={controller({
            name: checkoutForm.getName('address'),
          })}
          className='w-full'
        />
        <Field.TextInput
          autoComplete='postal-code'
          required
          placeholder='Postcode'
          use={controller({
            name: checkoutForm.getName('postcode'),
          })}
          type='number'
          className='w-full'
        />
      </div>
    </div>
  );
};

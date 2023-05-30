import { useUnit } from 'effector-react';
import { useForm } from 'effector-react-form';
import { clsxm } from '@/shared/lib/clsxm';
import { $submitIsDisabled, checkoutForm } from '../../model/checkout.model';
import { ContactDetailsForm } from './contact-details-form';
import { RegionForm } from './region-form';

export const CheckoutForm = () => {
  const { submitIsDisabled } = useUnit({
    submitIsDisabled: $submitIsDisabled,
  });
  const { handleSubmit } = useForm({
    form: checkoutForm,
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex  flex-col gap-5'>
        <div className='grid gap-3 lg:max-w-[900px] lg:gap-3.5 2xl:gap-5'>
          <ContactDetailsForm />
          <RegionForm />
        </div>
        <button
          className={clsxm(
            'flex  w-fit bg-black px-4 py-3 uppercase leading-none text-primary',
            {
              'pointer-events-none  bg-white text-gray-300 ': submitIsDisabled,
            }
          )}
          type='submit'
        >
          Place order
        </button>
      </div>
    </form>
  );
};

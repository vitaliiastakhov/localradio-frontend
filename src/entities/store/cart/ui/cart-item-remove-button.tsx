import { useUnit } from 'effector-react';
import { Maybe } from 'yup';
import { removeProductEv } from '../../items/model/shop.model';

interface CartItemRemoveButtonProps {
  attributes?: any;
  productId?: Maybe<string>;
  selectedSize?: Maybe<string>;
}

export const CartItemRemoveButton = ({
  attributes,
  selectedSize,
  productId,
}: CartItemRemoveButtonProps) => {
  const { removeProduct } = useUnit({
    removeProduct: removeProductEv,
  });
  return (
    <button
      type='button'
      onClick={() =>
        attributes?.attributes?.size && selectedSize
          ? removeProduct({
              id: productId,
              selectedSize,
            })
          : removeProduct({ id: productId })
      }
      className='text-[0.8rem] '
    >
      Remove
    </button>
  );
};

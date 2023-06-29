import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { openCartModalEv } from '../../cart/model/cart.model';
import { addProductEv } from '../model/shop.model';
import { ShopSubmitElementProps } from './big-shop-button';

type UseSubmitProps = Pick<
  ShopSubmitElementProps,
  'disabled' | 'product' | 'selectedSize'
>;

export const useSubmit = ({
  disabled,
  product,
  selectedSize,
}: UseSubmitProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { openCartModal, addProduct } = useUnit({
    openCartModal: openCartModalEv,
    addProduct: addProductEv,
  });
  const onSubmit = () => {
    if (!disabled) {
      addProduct({
        ...product,
        quantity,
        selectedSize,
      });
      openCartModal(true);
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    isSubmitted && setQuantity(1);
  }, [isSubmitted]);

  return {
    onSubmit,
    setQuantity,
    isSubmitted,
    quantity,
  };
};

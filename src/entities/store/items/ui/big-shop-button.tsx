import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { ShopButton } from '@/entities/store/items/ui/shop-button';
import { ShopItemEntity } from '@/shared/api/graphql/__generated__/schema.graphql';
import { clsxm } from '@/shared/lib/clsxm';
import { productQuantityRestriction } from '@/shared/lib/constants/common';
import { openCartModalEv } from '../../cart/model/cart.model';
import { addProductEv } from '../model/shop.model';

interface ShopSubmitElementProps {
  product: ShopItemEntity;
  disabled?: boolean;
  price?: number;
  selectedSize: string;
  type: 'page' | 'card';
}

export const ShopSubmitElement = ({
  product,
  type,
  disabled,
  selectedSize,
}: ShopSubmitElementProps) => {
  const { attributes } = product;
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { openCartModal, addProduct } = useUnit({
    openCartModal: openCartModalEv,
    addProduct: addProductEv,
  });

  const sizes = attributes?.attributes?.size;
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

  const ShopSubmitClasses = clsxm(
    'flex w-full items-center justify-between overflow-hidden text-[0.95rem] uppercase sm:text-[1rem]',
    'bg-black fill-white text-white hover:fill-black',
    {
      'pointer-events-none bg-black text-white':
        !attributes?.soldout && disabled,
    },
    {
      'pointer-events-none border-x-2 border-b-2 border-t-2 border-black bg-gray-color text-white   lg:border-b-0':
        attributes?.soldout,
    },
    {
      'h-10  lg:h-12 2xl:h-14': type === 'page',
    }
  );

  return (
    <div className={ShopSubmitClasses}>
      <ShopButton
        aria-label='Remove item'
        type='button'
        onClick={() => {
          !disabled &&
            setQuantity((prev) =>
              prev !== productQuantityRestriction.min
                ? prev - 1
                : productQuantityRestriction.min
            );
        }}
        disabled={disabled}
        sizeVariant='large'
        operation='minus'
      />
      <button
        type='button'
        onClick={onSubmit}
        className='flex h-full w-full items-center justify-center font-medium uppercase transition-colors hover:bg-white hover:text-black'
      >
        {!attributes?.soldout ? (
          <div>
            {!isSubmitted &&
            !selectedSize &&
            sizes?.length > 0 &&
            !attributes?.soldout
              ? 'Please select a size'
              : `Add ${quantity} to cart`}
          </div>
        ) : (
          <div>Soldout</div>
        )}
      </button>

      <ShopButton
        aria-label='Add Item'
        type='button'
        disabled={disabled}
        onClick={() => {
          !disabled &&
            setQuantity((prev) =>
              prev !== productQuantityRestriction.max
                ? prev + 1
                : productQuantityRestriction.max
            );
        }}
        sizeVariant='large'
        operation='plus'
      />
    </div>
  );
};

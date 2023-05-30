import { sample } from 'effector';
import type { Maybe } from 'yup';
import { ShopItemEntity } from '@/shared/api/graphql/__generated__/schema.graphql';
import { productQuantityRestriction } from '@/shared/lib/constants/common';
import { store } from '../../factory/shop-factory.model';

export interface Product extends ShopItemEntity {
  quantity?: Maybe<number>;
  selectedSize?: Maybe<string>;
}

const shopItems = store.domain('shopItems');

export const submitShopEv = shopItems.createEvent<boolean>();
export const $isSubmittedShop = shopItems
  .createStore<boolean>(false)
  .on(submitShopEv, (_, next) => next);
export const selectSizeEv = shopItems.createEvent<string>();
export const $selectedSize = shopItems
  .createStore<string>('')
  .on(selectSizeEv, (_, next) => next);

//#region some

//#endregion some

export const $totalQuantity = shopItems.createStore<Maybe<number>>(null);
export const $products = shopItems.createStore<Product[]>([]);

export const $totalPrice = shopItems.createStore<Maybe<number>>(null);

export const incrementProductQuantityEv = shopItems.createEvent<{
  id?: Maybe<string>;
  selectedSize?: Maybe<string>;
}>();
export const decrementProductQuantityEv = shopItems.createEvent<{
  id?: Maybe<string>;
  selectedSize?: Maybe<string>;
}>();

const dropItem = (cart: Product[], index: number) =>
  cart.slice(0, index).concat(cart.slice(index + 1));
const dropIndex = (cart: Product[], index: number) =>
  cart.slice(0, index).concat(cart.slice(index + 1));

export const addProductEv = shopItems.createEvent<Product>();
export const removeProductEv = shopItems.createEvent<{
  id?: Maybe<string>;
  selectedSize?: string;
}>();
export const productRemovedEvent = shopItems.createEvent<number>();

$products
  .on(addProductEv, (cart, product) => {
    let modified = false;
    const duplicate: Product[] = cart.map((item) => {
      const quantity = () => {
        if (item.quantity && item.quantity >= productQuantityRestriction.max) {
          return item.quantity;
        }
        if (
          item.quantity &&
          product.quantity &&
          item.quantity + product.quantity >= productQuantityRestriction.max
        ) {
          return productQuantityRestriction.max;
        }
        return item.selectedSize === product.selectedSize &&
          item.quantity &&
          item.quantity !== productQuantityRestriction.max &&
          product.quantity
          ? item.quantity + product.quantity
          : item.quantity;
      };
      if (
        item.id === product.id &&
        item.selectedSize === product.selectedSize
      ) {
        modified = true;
        return {
          ...item,
          quantity: quantity(),
        };
      }

      return item;
    });
    if (!modified) {
      duplicate.push(product);
    }
    return duplicate;
  })
  .on(incrementProductQuantityEv, (cart, { id, selectedSize }) => {
    return cart.map((product) => {
      return product.quantity !== productQuantityRestriction.max &&
        product.id === id &&
        product.selectedSize === selectedSize
        ? { ...product, quantity: product.quantity && product.quantity + 1 }
        : product;
    });
  })
  .on(decrementProductQuantityEv, (cart, { id, selectedSize }) => {
    const index = cart.findIndex((product) => product.id === id);
    return cart[index].quantity === 1
      ? dropItem(cart, index)
      : cart.map((product) =>
          product.id === id && product.selectedSize === selectedSize
            ? {
                ...product,
                quantity: product.quantity && product.quantity - 1,
              }
            : product
        );
  })
  .on(productRemovedEvent, dropIndex)
  .on(
    removeProductEv,
    (state, { id: index, selectedSize: newSelectedSize }) => {
      return newSelectedSize
        ? state.filter(({ id, selectedSize }) => {
            if (selectedSize !== newSelectedSize)
              return selectedSize !== newSelectedSize;
            return id !== index;
          })
        : state.filter(({ id }) => {
            return id !== index;
          });
    }
  );

sample({
  source: $products,
  fn: (products) => {
    return (
      products
        .map(
          ({ quantity, attributes }) =>
            quantity && attributes?.price && attributes.price * quantity
        )
        .reduce<Maybe<number>>((acc, curr) => curr && curr + acc!, 0) ?? null
    );
  },
  target: $totalPrice,
});

sample({
  source: $products,
  fn: (products) => {
    const p = products.map(({ quantity }) => quantity);
    if (p.length > 0)
      return (
        p.reduce<Maybe<number>>((acc, curr) => curr && curr + acc!, 0) ?? null
      );
    return null;
  },
  target: $totalQuantity,
});

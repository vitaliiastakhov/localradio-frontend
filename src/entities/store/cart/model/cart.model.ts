import { store } from '../../factory/shop-factory.model';

const cartModal = store.domain('cartModal');

export const openCartModalEv = cartModal.createEvent<boolean>();
export const $isOpenedCartModal = cartModal
  .createStore<boolean>(false)
  .on(openCartModalEv, (_, b) => b);

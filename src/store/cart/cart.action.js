import { CART_ACTION_TYPES } from './cart.types';

export const setCartItems = (cartItems, cartTotal, cartCount) => ({
  type: CART_ACTION_TYPES.SET_CART_ITEMS,
  payload: { cartItems, cartTotal, cartCount },
});

export const setIsCartOpen = (isOpen) => ({
  type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
  payload: isOpen,
});
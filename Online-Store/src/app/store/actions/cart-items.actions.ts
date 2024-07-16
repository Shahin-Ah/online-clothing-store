import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { CartItem } from "src/app/models/cart-item.model";
import { Order } from "src/app/order/models/order";


export const ADD_CART_ITEM = '[Cart Items] Add Cart Item';
export const ADD_CART_ITEM_SUCCESS = '[Cart Items] Add Cart Item Success';
export const ADD_CART_ITEM_FAIL = '[Cart Items] Add Cart Item Fail';
export const UPDATE_CART_ITEM = '[Cart Items] Update Cart Item';
export const UPDATE_CART_ITEM_SUCCESS = '[Cart Items] Update Cart Item Success';
export const UPDATE_CART_ITEM_FAIL = '[Cart Items] Update Cart Item Fail';
export const REMOVE_CART_ITEM = '[Cart Items] Remove Cart Item';
export const REMOVE_CART_ITEM_SUCCESS = '[Cart Items] Remove Cart Item Success';
export const REMOVE_CART_ITEM_FAIL = '[Cart Items] Remove Cart Item Fail';
export const LOAD_CART_ITEMS = '[Cart Items] Load Cart Items';
export const LOAD_CART_ITEMS_FAIL = '[Cart Items] Load Cart Items Fail';
export const LOAD_CART_ITEMS_SUCCESS = '[Cart Items] Load Cart Items Success';
export const PLACE_ORDER = '[Place Order] Place Order';
export const PLACE_ORDER_SUCCESS = '[Place Order] Place Order Success';
export const PLACE_ORDER_FAIL = '[Place Order] Place Order Fail';

export const addCartItem = createAction(
  ADD_CART_ITEM,
  props<{cartItem: CartItem}>()
);

export const addCartItemSuccess = createAction(
  ADD_CART_ITEM_SUCCESS,
  props<{cartItem: CartItem}>()
);

export const addCartItemFail = createAction(
  ADD_CART_ITEM_FAIL,
  props<{error: any}>()
);

export const updateCartItem = createAction(
  UPDATE_CART_ITEM,
  props<{cartItem: Update<CartItem>}>()
);

export const updateCartItemSuccess = createAction(
  UPDATE_CART_ITEM_SUCCESS,
  props<{cartItem: Update<CartItem>}>()
);

export const updateCartItemFail = createAction(
  UPDATE_CART_ITEM_FAIL,
  props<{error: any}>()
);

export const removeCartItem = createAction(
  REMOVE_CART_ITEM,
  props<{id: string}>()
);

export const removeCartItemSuccess = createAction(
  REMOVE_CART_ITEM_SUCCESS,
  props<{id: string}>()
);

export const removeCartItemFail = createAction(
  REMOVE_CART_ITEM_FAIL,
  props<{error: any}>()
);

export const loadCartItems = createAction(
  LOAD_CART_ITEMS
);

export const allCartItemsLoaded = createAction(
  LOAD_CART_ITEMS_SUCCESS,
  props<{cartItems: CartItem[]}>()
);

export const LoadCartItemsFail = createAction(
  LOAD_CART_ITEMS_FAIL,
  props<{error: any}>()
);

export const placeOrder = createAction(
  PLACE_ORDER,
  props<{order: Order}>()
);

export const OrderPlacedSuccessfully = createAction(
  PLACE_ORDER_SUCCESS,
);

export const placeOrderFailed = createAction(
  PLACE_ORDER_FAIL,
  props<{error: any}>()
);
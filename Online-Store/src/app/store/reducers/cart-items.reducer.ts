import { Dictionary, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CartItem } from "src/app/models/cart-item.model";
import {cartActions} from '../actions';

export interface cartItemState extends EntityState<CartItem> {
  error: any;
}

export const adapter = createEntityAdapter<CartItem>({
  selectId: (cartItem: CartItem) => cartItem?.id 
});

export const initialCartItemsState = adapter.getInitialState({
  error: null
});

export const cartItemsReducer = createReducer(
  initialCartItemsState,
  on(cartActions.allCartItemsLoaded,
    (state, action) =>
      adapter.setAll(
        action.cartItems, {
          ...state,
          allCartItemsLoaded: true,
          error: null
        }
      )
  ),
  on(cartActions.addCartItemSuccess,
    (state, action) =>
      adapter.upsertOne(action.cartItem, state)
  ),
  on(cartActions.updateCartItemSuccess,
    (state, action) =>
      adapter.updateOne(action.cartItem, state)
  ),
  on(cartActions.removeCartItemSuccess,
    (state, action) =>
      adapter.removeOne(action.id, state)
  ),
  on(cartActions.LoadCartItemsFail,
    (state, {error}) => {
    return {...state, error}
  }),
  on(cartActions.OrderPlacedSuccessfully,
    (state) => adapter.removeAll(state)
  ),
  on(cartActions.placeOrderFailed,
    (state, {error}) => {
    return {...state, error}
  })
);

export const {
  selectAll,
  selectEntities
} = adapter.getSelectors();

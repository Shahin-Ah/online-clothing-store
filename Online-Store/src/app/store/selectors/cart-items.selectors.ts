import {AppState} from '../reducers/index';
import * as fromCartItems from '../reducers/cart-items.reducer';
import * as fromFeature from '../reducers';
import { createSelector } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item.model';
import { Observable } from 'rxjs';
import { cartItemState } from '../reducers/cart-items.reducer';


export const getCartItemsState = createSelector(
  fromFeature.getCartState,
  (state: cartItemState) => state
);
export const selectCartItems = createSelector(
  getCartItemsState,
  fromCartItems.selectAll
);

export const selectEntities = createSelector(
  getCartItemsState,
  fromCartItems.selectEntities
);

export const selectCartItemQuantity = (id: string) => createSelector(
  selectEntities,
  (entities): number=> entities[id] && entities[id].quantity
)

export const selectTotalPrice = createSelector(
  selectCartItems,
  (cartItems): number => {
      return cartItems.reduce((prv, cur: CartItem) => {
      return prv + cur.price * cur.quantity }, 0)
    }
);

export const selectCartItemsStateError = createSelector(
  fromFeature.getCartState,
  (state: cartItemState) => state.error
);

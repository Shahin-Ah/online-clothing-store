import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {routerReducer, RouterReducerState, RouterStateSerializer} from '@ngrx/router-store';
import * as fromUtility from './utility.reducer';
import * as fromCart  from './cart-items.reducer';
import * as fromAuth  from './auth.reducer';

// tslint:disable-next-line:no-empty-interface
export interface AppState {
  routerReducer: RouterReducerState<any>;
  utility: fromUtility.UtilityState;
  cart: fromCart.cartItemState;
  auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<AppState> = {
    // saving router state for time traveling debugger
    routerReducer: routerReducer,
    utility: fromUtility.utilityReducer,
    cart: fromCart.cartItemsReducer,
    auth: fromAuth.authReducer
};

export function logger(reducer: ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        return reducer(state, action);
    };
}

// excuted before the main reducer
export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [logger] : [];

export const getRouterState = createFeatureSelector<
RouterReducerState>('routerReducer');

export const getUtilityState = (state: AppState) => state.utility;
export const getCartState = (state: AppState) => state.cart;
export const getAuthState = (state: AppState) => state.auth;




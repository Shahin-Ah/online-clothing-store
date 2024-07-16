
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromOrders from './orders.reducers';

export interface OrdersState {
  orders: fromOrders.ordersState;
}

export const reducers: ActionReducerMap<OrdersState> = {
  orders: fromOrders.ordersReducer
};

export const selectOrdersState =
    createFeatureSelector<OrdersState>('orders');

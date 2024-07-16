import { OrdersState } from './../reducers/index';
import { createSelector} from '@ngrx/store';
import {ordersState} from '../reducers/orders.reducers';
import * as fromOrders from '../reducers/orders.reducers';
import * as fromFeature from '../reducers';
import { Order } from '../../models/order';
import { Dictionary } from '@ngrx/entity';


export const getOrdersState = createSelector(
    fromFeature.selectOrdersState,
    (state: OrdersState) => state.orders
);
export const selectAllItems = createSelector(
    getOrdersState,
    fromOrders.selectAll
);

export const selectEntities = createSelector(
  getOrdersState,
  fromOrders.selectEntities
);

export const isOrderPlaced = createSelector(
  getOrdersState,
  (state: ordersState) => state.isOrderPlaced
);

export const getOrder = (id: number) => createSelector(
  selectEntities,
  (entities: Dictionary<Order>) => entities[id]
);


import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {OrdersActions} from '../actions';
import { Pagination } from '../../../shared/models/pagination';
import { Order } from '../../models/order';


export interface ordersState extends EntityState<Order> {
    allOrdersLoaded: boolean;
    isOrderPlaced: boolean;
    pagination: Pagination;
    error: string;
}


export const adapter = createEntityAdapter<Order>({
});


export const initialOrdersState = adapter.getInitialState({
  allOrdersLoaded: false,
  isOrderPlaced: false,
  pagination: null,
  error: null,
});


export const ordersReducer = createReducer(

    initialOrdersState,
      // dispatched from item effect after items is loaded
      on(OrdersActions.OrdersLoaded,
        (state, {paginatedResult}) => adapter.setAll(
          paginatedResult.items,
          {...state, // previous state
              pagination: paginatedResult.pagination,
              allOrdersLoaded: true // add to state for caching data
          })
      ),
      on(
        OrdersActions.LoadOrdersFail,
        (state, {error}) => {
          return {... state, error}
        }
      ),
      on(OrdersActions.orderPlaced,
        (state, {order}) => {
          state = {... state, isOrderPlaced: true};
          return adapter.upsertOne(order, state)
        }
      )
);

// export a built in prop which is used inside the selector file
export const {
    selectAll,
    selectEntities
} = adapter.getSelectors();


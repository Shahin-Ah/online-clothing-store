import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Order } from "../../models/order";
import { PaginatedResult } from "src/app/shared/models/pagination";

// load Items
export const LOAD_ORDERS = '[Orders] Load Orders';
export const LOAD_ORDERS_SUCCESS = '[Orders] Load Orders Success';
export const LOAD_ORDERS_FAIL = '[Orders] Load Orders Fail';
export const ORDER_SUCCESS = '[Orders] Order Successful';

export const loadOrders = createAction(
  LOAD_ORDERS
);
export const OrdersLoaded = createAction(
  LOAD_ORDERS_SUCCESS,
  props<{paginatedResult: PaginatedResult<Order[]>}>()
);
export const LoadOrdersFail = createAction(
  LOAD_ORDERS_FAIL,
  props<{error: any}>()
);
export const orderPlaced = createAction(
  ORDER_SUCCESS,
  props<{order: Order}>()
);
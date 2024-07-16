
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromItems from './items.reducers';

export interface ProductsState {
  items: fromItems.itemsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  items: fromItems.itemsReducer
};

export const selectProductsState =
    createFeatureSelector<ProductsState>('products');

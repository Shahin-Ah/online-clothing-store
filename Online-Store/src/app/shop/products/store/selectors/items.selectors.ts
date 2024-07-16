import { ProductsState } from './../reducers/index';
import { createSelector} from '@ngrx/store';
import {itemsState} from '../reducers/items.reducers';
import * as fromItems from '../reducers/items.reducers';
import * as fromFeature from '../reducers';
import { Product } from '../../models/item';
import { selectQueryParams, selectRouteParam, selectRouteParams } from 'src/app/store/selectors/router.selector';


export const getItemsState = createSelector(
    fromFeature.selectProductsState,
    (state: ProductsState) => state.items
);
export const selectAllItems = createSelector(
    getItemsState,
    fromItems.selectAll
);

export const selectEntities = createSelector(
  getItemsState,
  fromItems.selectEntities
);

export const selectMenItems = createSelector(
  getItemsState,
  (state: itemsState) => state.menItems
);

export const selectWomenItems = createSelector(
  getItemsState,
  (state: itemsState) => state.womenItems
);

export const selectFilteredItems = createSelector(
  getItemsState,
  (state: itemsState) => {if(state.filteredItems) return state.filteredItems}
);

// for caching data in the store
export const areItemsLoaded = createSelector(
    getItemsState,
    selectRouteParam('category'),
    (state: itemsState, param) => {
      if(param && param === 'men')
        return state.menItemsLoaded;
      else if(param && param === 'women')
        return state.womenItemsLoaded;
    }
);
export const isItemsLoaded = createSelector(
  selectEntities,
  selectRouteParams,
  (entities, param) => entities[+param?.id] !== undefined
);
export const getSelectedItem = createSelector(
  selectEntities,
  selectRouteParams,
  (entities, param): Product => entities[+param?.id]
);
export const getQueryAndRouteParams = createSelector(
  selectQueryParams,
  selectRouteParams,
  (queryParams, routeParams) => {
    return {queryParams, routeParams}
  }
);
export const itemsLoadError = createSelector(
  getItemsState,
  (state: itemsState) => state.error
);

export const selectPopularMenItems = createSelector(
  getItemsState,
  (state: itemsState) => state.menPopularItems
);

export const selectPopularWomenItems = createSelector(
  getItemsState,
  (state: itemsState) => state.womenPopularItems
);

export const getPagination = createSelector(
  getItemsState,
  (state: itemsState) => state.pagination
);

export const arePopularItemsLoaded = createSelector(
  getItemsState,
  selectRouteParam('category'),
  (state: itemsState, param) => {
    if(param && param === 'men')
      return state.menPopularItemsLoaded;
    else if(param && param === 'women')
      return state.womenPopularItemsLoaded;
  }
);

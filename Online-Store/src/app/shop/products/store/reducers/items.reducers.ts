import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {ItemsActions} from '../actions';
import { compareItems, PopularItem, Product, ProductOptions } from '../../models/item';
import { Pagination } from '../../../../shared/models/pagination';


export interface itemsState extends EntityState<Product> {
    menItems: Product[];
    womenItems: Product[];
    allItemsLoaded: boolean;
    menItemsLoaded: boolean;
    womenItemsLoaded: boolean
    menPopularItemsLoaded: boolean;
    womenPopularItemsLoaded: boolean;
    menPopularItems: PopularItem [];
    womenPopularItems: PopularItem [];
    filteredItems: Product[];
    pagination: Pagination;
    error: string;
}


export const adapter = createEntityAdapter<Product>({
  sortComparer : compareItems,
});


export const initialItemsState = adapter.getInitialState({
    menItems: [],
    womenItems: [],
    allItemsLoaded: false,
    menItemsLoaded: false,
    womenItemsLoaded: false,
    menPopularItemsLoaded: false,
    womenPopularItemsLoaded: false,
    menPopularItems: [],
    womenPopularItems: [],
    filteredItems: [],
    pagination: null,
    error: null,
});


export const itemsReducer = createReducer(

    initialItemsState,
      // dispatched from item effect after items is loaded
      on(ItemsActions.itemsLoaded,
        (state, {paginatedResult}) => adapter.setAll(
          paginatedResult.items,
          {...state, // previous state
              pagination: paginatedResult.pagination,
              allItemsLoaded: true // add to state for caching data
          })
      ),
      on(
        ItemsActions.LoadItemsFail,
        (state, {error}) => {
          return {... state, error}
        }
      ),
      on(
        ItemsActions.LoadFilteredItemsFail,
        (state, {error}) => {
          return {... state, error}
        }
      ),
      on(ItemsActions.menItemsLoaded,
        (state, {paginatedResult}) => {
            return {...state, // previous state
              menItems: paginatedResult?.items, pagination: paginatedResult.pagination, menItemsLoaded: true, // add to state for caching data
            }
          }
      ),
      on(
        ItemsActions.LoadMenItemsFail,
        (state, {error}) => {
          return {... state, error}
        }
      ),
      on(ItemsActions.womenItemsLoaded,
        (state, {paginatedResult}) => {
            return {...state, // previous state
            womenItems: paginatedResult?.items, pagination: paginatedResult.pagination, womenItemsLoaded: true, // add to state for caching data
            }
          }
      ),
      on(
        ItemsActions.LoadWomenItemsFail,
        (state, {error}) => {
          return {...state, error}
        }
      ),
      on(ItemsActions.menPopularItemsLoaded,
        (state, {popularItems}) => {
          return {...state, menPopularItems: popularItems, menPopularItemsLoaded: true }
        }
      ),
      on(ItemsActions.womenPopularItemsLoaded,
        (state, {popularItems}) => {
          return {...state, womenPopularItems: popularItems, womenPopularItemsLoaded: true }
        }
      ),
      on(
        ItemsActions.loadProductDetailsSuccess,
        (state, {product}) => adapter.setOne(product, state)
      ),

      on(
        ItemsActions.loadProductDetailsError,
        (state, {error}) => {
          return {... state, error}
        }
      ),

      on(ItemsActions.itemUpdated, (state, action) =>
        adapter.updateOne(action.update, state) ) // update the curr state

);

// export a built in prop which is used inside the selector file
export const {
    selectAll,
    selectEntities
} = adapter.getSelectors();


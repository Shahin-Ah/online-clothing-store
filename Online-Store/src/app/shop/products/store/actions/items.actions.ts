import { PopularItem } from './../../models/item';
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/item";
import { ProductsParams } from '../../models/ProductsParams';
import { PaginatedResult } from '../../../../shared/models/pagination';

// load Items
export const LOAD_ITEMS = '[Products] Load Items';
export const LOAD_ITEMS_SUCCESS = '[Products] Load Items Success';
export const LOAD_ITEMS_FAIL = '[Products] Load Items Fail';
export const LOAD_MEN_ITEMS = '[Products] Load Men Items';
export const LOAD_MEN_ITEMS_SUCCESS = '[Products] Load Men Items Success';
export const LOAD_MEN_ITEMS_FAIL = '[Products] Load Men Items Fail';
export const LOAD_WOMEN_ITEMS = '[Products] Load Women Items';
export const LOAD_WOMEN_ITEMS_SUCCESS = '[Products] Load Women Items Success';
export const LOAD_WOMEN_ITEMS_FAIL = '[Products] Load Women Items Fail';
export const LOAD_FILTER_ITEMS = '[Products] Load Filtered Items';
export const LOAD_FILTERED_ITEMS_SUCCESS = '[Products] Load Filtered Items Success';
export const LOAD_FILTERED_ITEMS_FAIL = '[Products] Load Filtered Items Fail';
export const LOAD_POPULAR_ITEMS = '[Products] Load Popular Items';
export const LOAD_POPULAR_MEN_ITEMS_SUCCESS = '[Products] Load Popular Men Items Success';
export const LOAD_POPULAR_WOMEN_ITEMS_SUCCESS = '[Products] Load Popular Women Items Success';
export const LOAD_POPULAR_ITEMS_FAIL = '[Products] Load Popular Items Fail';
export const CHANGE_SELECTED_ITEM_OPTION = '[Products] Change selected Item Option by color';

export const loadItems = createAction(
  LOAD_ITEMS,
  props<{productsParams?: ProductsParams, routeParam: string}>()
);
export const itemsLoaded = createAction(
  LOAD_ITEMS_SUCCESS,
  props<{paginatedResult: PaginatedResult<Product[]>}>()
  );
export const LoadItemsFail = createAction(
  LOAD_ITEMS_FAIL,
  props<{error: any}>()
);
export const loadMenItems = createAction(
  LOAD_MEN_ITEMS,
  props<{productsParams?: ProductsParams, routeParam: string}>()
);
export const menItemsLoaded = createAction(
  LOAD_MEN_ITEMS_SUCCESS,
  props<{paginatedResult: PaginatedResult<Product[]>}>()
  );
  export const LoadMenItemsFail = createAction(
    LOAD_MEN_ITEMS_FAIL,
    props<{error: any}>()
  );
  export const loadWomenItems = createAction(
  LOAD_WOMEN_ITEMS,
  props<{productsParams?: ProductsParams, routeParam: string}>()
);
export const womenItemsLoaded = createAction(
  LOAD_WOMEN_ITEMS_SUCCESS,
  props<{paginatedResult: PaginatedResult<Product[]>}>()
);
export const LoadWomenItemsFail = createAction(
  LOAD_WOMEN_ITEMS_FAIL,
  props<{error: any}>()
);
export const ChangeSelectedItemOption = createAction(
  CHANGE_SELECTED_ITEM_OPTION,
  props<{color: string}>()
);
export const loadFilteredItems = createAction(
  LOAD_FILTER_ITEMS,
  props<{productsParams: ProductsParams, routeParam: string}>()
);
export const filteredItemsLoaded = createAction(
  LOAD_FILTERED_ITEMS_SUCCESS,
  props<{paginatedResult: PaginatedResult<Product>}>()
);
export const LoadFilteredItemsFail = createAction(
  LOAD_FILTERED_ITEMS_FAIL,
  props<{error: any}>()
);
export const loadPopularItems = createAction(
  LOAD_POPULAR_ITEMS,
  props<{category: string}>()
);
export const menPopularItemsLoaded = createAction(
  LOAD_POPULAR_MEN_ITEMS_SUCCESS,
  props<{popularItems: PopularItem[]}>()
);
export const womenPopularItemsLoaded = createAction(
  LOAD_POPULAR_WOMEN_ITEMS_SUCCESS,
  props<{popularItems: PopularItem[]}>()
);
export const PopularItemsFail = createAction(
  LOAD_POPULAR_ITEMS_FAIL,
  props<{error: any}>()
);

export const loadProductDetailsSuccess = createAction(
  '[Products] Load Product Details Success',
  props<{product: Product}>()
)

export const loadProductDetailsError = createAction(
  '[Products] Load Product Details Error',
  props<{error: any}>()
)

export const itemUpdated = createAction(
'[Edit Item Dialog] Item Updated',
props<{update: Update<Product>}>()
);

import { createAction, props } from "@ngrx/store";
import { Brands } from "src/app/models/brand.model";
import { Categories } from "src/app/models/categories.model";



export const LOAD_CATEGORIES = '[Categories] Load Categories';
export const LOAD_CATEGORIES_SUCCESS = '[Categories] Load Categories Success';
export const LOAD_CATEGORIES_FAIL = '[Categories] Load Categories Fail';
export const LOAD_BRANDS = '[Brands] Load Brands';
export const LOAD_BRANDS_SUCCESS = '[Brands] Load Brands Success';
export const LOAD_BRANDS_FAIL = '[Brands] Load Brands Fail';
export const SET_LOADING_ACTION = '[Utility state] set loading spinner';


export const loadAllCategories = createAction(
  LOAD_CATEGORIES
);

export const allCategoriesLoaded = createAction(
  LOAD_CATEGORIES_SUCCESS,
  props<{categories: Categories[]}>()
);

export const LoadCategoriesFail = createAction(
  LOAD_CATEGORIES_FAIL,
  props<{error: any}>()
);

export const loadAllBrands = createAction(
  LOAD_BRANDS
);

export const allBrandsLoaded = createAction(
  LOAD_BRANDS_SUCCESS,
  props<{brands: Brands[]}>()
);

export const LoadBrandsFail = createAction(
  LOAD_BRANDS_FAIL,
  props<{error: any}>()
);

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);


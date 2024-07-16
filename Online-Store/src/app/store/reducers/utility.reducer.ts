import { createReducer, on } from "@ngrx/store";
import { Categories } from "src/app/models/categories.model";
import { AppActions } from "../actions";
import { Brands } from "src/app/models/brand.model";
import { setLoadingSpinner } from "../actions/app.actions";


export interface UtilityState {
  showLoading: boolean;
  categories: Categories[]; // for caching data in the store
  brands: Brands[];
  error: string;
}

export const initialUtilityState: UtilityState = {
  showLoading: false,
  categories: [],
  brands: [],
  error: null
};

export const utilityReducer = createReducer(

  initialUtilityState,
    // dispatched from item effect after items is loaded
  on(AppActions.allCategoriesLoaded,
      (state, {categories}) => {
        return {...state, categories}
      }

    ),

    on(
      AppActions.LoadCategoriesFail,
      (state, {error}) => {
        return {... state, error}
      }
    ),

    on(AppActions.allBrandsLoaded,
      (state, {brands}) => {
        return { ...state, brands}
      }
    ),

    on(
      AppActions.LoadBrandsFail,
      (state, {error}) => {
        return {... state, error}
      }
    ),
    on(setLoadingSpinner, (state, {status}) => {
      return {
        ...state,
        showLoading: status,
      };
    }),
);

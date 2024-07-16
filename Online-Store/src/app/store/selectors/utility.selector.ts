import { createSelector } from "@ngrx/store";
import { getUtilityState } from "../reducers";
import { UtilityState } from "../reducers/utility.reducer";
import { Params } from "@angular/router";
import { Categories } from "src/app/models/categories.model";
import { Brands } from "src/app/models/brand.model";



export const getCtg = (gender: any) => createSelector(
  getUtilityState,
  (state: UtilityState) => state.categories.find(ctgs => ctgs.name === gender)
);

export const getCtgs =  createSelector(
  getUtilityState,
  (state: UtilityState): Categories[] => state.categories
);

export const getBrands =  createSelector(
  getUtilityState,
  (state: UtilityState): Brands[] => state.brands
);
// for spinner
export const getLoading = createSelector(
  getUtilityState,
  (state) => state.showLoading
);
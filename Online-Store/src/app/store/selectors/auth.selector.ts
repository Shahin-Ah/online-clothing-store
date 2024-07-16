import { createSelector } from "@ngrx/store";
import { getAuthState } from "../reducers";
import { AuthState } from "../reducers/auth.reducer";
import { jwtDecode } from "jwt-decode";




export const isAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => state.userAuthData.isAuthenticated
);

export const getIdToken = createSelector(
  getAuthState,
  (state: AuthState): object => jwtDecode(state.userAuthData.idToken)
)

export const isAuthenticatedAndAdmin = createSelector(
  getAuthState,
  getIdToken,
  (state: AuthState, idToken: object): boolean => state.userAuthData.isAuthenticated && idToken['role'].includes('Admin')
)
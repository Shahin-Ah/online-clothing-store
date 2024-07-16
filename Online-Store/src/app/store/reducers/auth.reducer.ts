import { createReducer, on } from "@ngrx/store";
import { UserAuthData } from "src/app/models/user.model";
import  {AuthActions} from '../actions';



export interface AuthState {
  userAuthData: UserAuthData
}

export const initialAuthState: AuthState = {
  userAuthData: {
    userData: undefined,
    isAuthenticated: false,
    accessToken: "",
    idToken: "",
    configId: ""
  }
}

export const authReducer = createReducer(

  initialAuthState,
    // dispatched from item effect after items is loaded
  on(AuthActions.AddUserAuthData,
      (state, {userAuthData}) => {
        return {...state, userAuthData}
      }

    )
)
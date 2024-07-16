import { createAction, props } from "@ngrx/store";
import { UserAuthData } from "src/app/models/user.model";






export const ADD_User_Auth_Data = '[User] Add User auth data';

export const AddUserAuthData = createAction(
  ADD_User_Auth_Data,
  props<{userAuthData: UserAuthData}>()
);
import { Action, createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export const Go = createAction(
  GO,
  props<{path: any[]; query?: object; extras?: NavigationExtras;}>()
);

export const Forward = createAction(
  FORWARD
);

export const Back = createAction(
  BACK
);

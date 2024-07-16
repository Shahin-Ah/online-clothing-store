import { Go } from './../actions/router.action';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RouterActions from '../actions';

import { tap, map } from 'rxjs/operators';


@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(
    () => this.actions$.
    pipe(
      ofType(RouterActions.Go),
      map((action) => action),
      tap(({ path, query: queryParams, extras }) => {
        this.router.navigate(path, { queryParams, ...extras });
      })
    ),
    {dispatch: false}
  );

  navigateBack$ = createEffect(
    () => this.actions$.
    pipe(
      ofType(RouterActions.Back),
      tap(() => this.location.back())
    ),
    {dispatch: false}
  );

  navigateForward$ = createEffect(
    () => this.actions$.
    pipe(
      ofType(RouterActions.Forward),
      tap(() => this.location.forward())
    ),
    {dispatch: false}
  );

}

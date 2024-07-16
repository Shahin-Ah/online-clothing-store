import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import { routerNavigationAction } from '@ngrx/router-store';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppHttpService } from 'src/app/services/app-http.services';
import { allCategoriesLoaded, LoadCategoriesFail, loadAllCategories, loadAllBrands, allBrandsLoaded, LoadBrandsFail } from '../actions/app.actions';
import { AppState } from 'src/app/store';
@Injectable()
export class AppEffects {
    loadCategories$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(loadAllCategories),
                concatMap(action => this.appHttpService.getCategories()),
                map(categories => allCategoriesLoaded({categories})),
                catchError(error => of(LoadCategoriesFail(error)))
            )
    );

    loadBrands$ = createEffect(
      () => this.actions$
          .pipe(
              ofType(loadAllBrands),
              concatMap(action => this.appHttpService.getBrands()),
              map(brands => allBrandsLoaded({brands})),
              catchError(error => of(LoadBrandsFail(error)))
          )
  );

    constructor(private actions$: Actions,
                private appHttpService: AppHttpService, private store$: Store<AppState>) {}
}


import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ItemsActions} from '../actions';
import {ItemsHttpService} from '../../services/items-http.service';
import {catchError, concatMap, exhaustMap, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import { LoadItemsFail, LoadMenItemsFail, itemsLoaded, loadProductDetailsError, loadProductDetailsSuccess, menItemsLoaded, menPopularItemsLoaded, womenPopularItemsLoaded} from '../actions/items.actions';
import * as fromRoot from 'src/app/store'
import { routerNavigationAction } from '@ngrx/router-store';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { arePopularItemsLoaded, isItemsLoaded } from '../selectors';
import { setLoadingSpinner } from 'src/app/store/actions/app.actions';
import { Product } from '../../models/item';
import { PaginatedResult } from '../../../../shared/models/pagination';
@Injectable()
export class ItemsEffects {
  private param: any;
  private cached = new Map<string, PaginatedResult<Product[]>>();

  loadItems$ = createEffect(
    () => this.actions$
        .pipe(
            ofType(ItemsActions.loadItems),
            tap(action => {
              this.param = action.routeParam;
            }),
            exhaustMap((action) => {
              const key = `${action.routeParam}-${JSON.stringify(action.productsParams)}`;
              if(!this.cached.has(key)){
                  return this.itemsHttpService.findAllItems(action.routeParam, action.productsParams)
                    .pipe(
                        map(paginatedResult => {
                          this.store$.dispatch(setLoadingSpinner({ status: false }));
                          this.cached.set(key, paginatedResult);
                          return itemsLoaded({paginatedResult});
                        }),
                        catchError(errors => {
                          const error = this.itemsHttpService.getErrorMessage(errors.error);
                          this.store$.dispatch(setLoadingSpinner({ status: false }));
                          this.store$.dispatch(fromRoot.Go({path: [`/products/${this.param}`]}));
                          return of(LoadItemsFail({error}))
                        })
                    );
                } else {
                    this.store$.dispatch(setLoadingSpinner({ status: false }));
                    return of(itemsLoaded({paginatedResult:
                                          this.cached.get(key)
                                          }));
                }
            })
        )
      );

    loadProductDetails$ = createEffect(
       () => this.actions$.pipe(
        ofType(routerNavigationAction),
        filter(action =>
           action.payload.event.url.includes('product-details')
        ),
        withLatestFrom(this.store$.pipe(select(isItemsLoaded))),
        filter(([action, itemsLoaded]) => {
          return !itemsLoaded;
        }),
        mergeMap(([action, storeState]) => { // try switchmap or exhaustmap
          const id = action.payload.routerState.root.firstChild.firstChild.params.id;
           return this.itemsHttpService.getProduct(id).pipe(
            map(product => {
              //if (id == 11) throw new Error('Product is not exist.');
              return loadProductDetailsSuccess({product})
            }),
            catchError(
              errors => {
                const error = this.itemsHttpService.getErrorMessage(errors.error);
                return of(loadProductDetailsError({error}),
              )},
            )
          );
        })
      )
    );

    loadPopularItems$ = createEffect(
      () => this.actions$
          .pipe(
              ofType(ItemsActions.loadPopularItems),
              withLatestFrom(this.store$.pipe(select(arePopularItemsLoaded))),
              filter(([action, itemsLoaded]) => {
                this.param = action.category;
                return !itemsLoaded;
              }),
              concatMap(([action, storeState])=> this.itemsHttpService.getPopularItems(action.category)),
              map((popularItems) => {
                if(this.param == 'men')
                  return menPopularItemsLoaded({popularItems});
                else if(this.param == 'women')
                  return womenPopularItemsLoaded({popularItems});
                })
          )
  );

    constructor(private actions$: Actions,
                private itemsHttpService: ItemsHttpService, private store$: Store) {}
}


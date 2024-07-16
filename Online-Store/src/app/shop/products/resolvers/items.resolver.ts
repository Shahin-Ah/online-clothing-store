import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {areItemsLoaded} from '../store/selectors/items.selectors';
import { selectRouteParams } from 'src/app/store/selectors/router.selector';
import { loadFilteredItems, loadItems, loadMenItems, loadPopularItems, loadWomenItems } from '../store/actions/items.actions';
import { Go } from 'src/app/store';
import { setLoadingSpinner } from 'src/app/store/actions/app.actions';


@Injectable()
export class ItemsResolver implements Resolve<boolean> {

    loading = false;
    constructor(private store$: Store) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store$
            .pipe(
                //select(areItemsLoaded),
                tap(() => {
                      if (!this.loading) {
                          this.loading = true;
                          if(route.params.category === 'men'){
                            this.store$.dispatch(setLoadingSpinner({ status: true }));
                            this.store$.dispatch(loadItems({productsParams: route.queryParams, routeParam: route.params.category}));
                          }
                          else if(route.params.category === 'women'){
                            this.store$.dispatch(setLoadingSpinner({ status: true }));
                            this.store$.dispatch(loadItems({productsParams: route.queryParams, routeParam: route.params.category}));
                          }
                          else
                              this.store$.dispatch(Go({path: ['/home']}));
                      }
                }),
                first(),
                finalize(() => this.loading = false) // when completed
            );
    }
}

import { CartItem } from '../../models/cart-item.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProductsParams } from 'src/app/shop/products/models/ProductsParams';
import { ItemsHttpService } from 'src/app/shop/products/services/items-http.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Store, select } from '@ngrx/store';
import { selectCartItems } from '../../store/selectors/cart-items.selectors';
import { loadCartItems } from '../../store/actions/cart-items.actions';
import { getQueryAndRouteParams } from 'src/app/shop/products/store';
import { Go } from 'src/app/store';
import { Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

public shoppingCartItems$: Observable<CartItem[]>;
public error$;
filteredOptions$: Observable<string[]>;
public productsParams: ProductsParams = new ProductsParams();
@ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
searchTerm = new FormControl();
options: string[] = [];
routeParam: string;
queryParams: Params = {};
constructor(private store: Store, private itemsService: ItemsHttpService) {

}
  ngOnInit(): void {
    this.store.dispatch(loadCartItems());
    this.shoppingCartItems$ = this.store.pipe(select(selectCartItems));
    this.store.pipe(select(getQueryAndRouteParams)).subscribe(queryRouteParam => {
        this.routeParam  = queryRouteParam.routeParams?.category;
        if(queryRouteParam.queryParams?.searchTerm &&
          queryRouteParam.queryParams?.searchTerm !== this.searchTerm?.value){
            this.searchTerm.setValue(queryRouteParam.queryParams.searchTerm);
            this.searchItems(queryRouteParam.queryParams.searchTerm);
          }
      }
    );

    this.filteredOptions$ = this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filter(value))
    );
  }

  private _filter(value: string): Observable<string[]> {
    if (typeof value != "string" || value.length === 0) {
      return of([]);
    }
    const filterValue = value.toLowerCase();
    //this.options.push(filterValue);
    return this.itemsService.FilterItemesTitleList(filterValue);
  }

  searchItems(option: string) {
    this.queryParams = {...this.queryParams, searchTerm: option};
    this.store.dispatch(Go({path: [`/products/${this.routeParam}`],
                         query: this.queryParams}));

  }
}

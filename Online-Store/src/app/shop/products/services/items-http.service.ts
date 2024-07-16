import { PopularItem, Product } from '../models/item';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { ProductsParams } from '../models/ProductsParams';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatedResult } from '../../../shared/models/pagination';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/store'

@Injectable({
  providedIn: 'root'
})
export class ItemsHttpService {

  constructor(private store$: Store, private http: HttpClient, public snackBar: MatSnackBar) { }

   findAllItems(routeParam: string, productParams?: ProductsParams): Observable<PaginatedResult<Product[]>> {
    const params: HttpParams = new HttpParams({fromObject: {...productParams}});
    let result;
    let pagination;
     return this.http.get<Product[]>(`/api/products/${routeParam}`, {observe: 'response',params: params}).pipe(
      map(response => {
        if (response.body) {
          result = response.body;
        }
        pagination = response.headers.get('Pagination');
        if (pagination) {
          pagination = JSON.parse(pagination);
        }
        return new PaginatedResult(result, pagination);
      })
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>('/api/products/gender/' + productId);
  }
  getPopularItems(category: string ): Observable<PopularItem[]> {
    return this.http.get<PopularItem[]>(`/api/products/${category}/popular`);
  }

  FilterItemesTitleList(searchTerm): Observable<string[]> {
    return this.http.get<string[]>('/api/ProductCategory/' + searchTerm);
  }

  getErrorMessage({title, errors= null}) {
    switch(title){
      case 'One or more validation errors occurred.':{
        const key = Object.keys(errors)[0];
        const error = `${key}: ${errors[key][0]}`;
        this.snackBar.open(error, '×', { panelClass: 'error', verticalPosition: 'top', duration: 7000 });
        return error;
      }
      case 'Unauthorized':{
        this.snackBar.open('Please login to continue', '×', { panelClass: 'error', verticalPosition: 'top', duration: 7000 });
        this.store$.dispatch(fromRoot.Go({path: ['\home']}));
        return title;
      }
      case 'Forbidden':{
        this.snackBar.open('You don\'t have privilege to access the page ', '×', { panelClass: 'error', verticalPosition: 'top', duration: 7000 });
        this.store$.dispatch(fromRoot.Go({path: ['\home']}));
        return title;
      }
        default:
          return 'Unknown error has occurred, please try again later';
    }
  }

}

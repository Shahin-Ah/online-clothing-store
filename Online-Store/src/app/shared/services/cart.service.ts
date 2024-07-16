import { Product } from '../../shop/products/models/item';
import { BehaviorSubject, map, Observable, Subscriber } from 'rxjs';
import { CartItem } from './../../models/cart-item.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/store'
import { Order } from 'src/app/order/models/order';
import { orderPlaced } from 'src/app/order/store/actions/orders.actions';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private store$: Store) {

  }

  public getCartItems() : Observable<CartItem[]> {
    return this.http.get<CartItem[]>('/api/cart');
  }

  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>('/api/cart' , cartItem);
  }

  updateCartItem(cartItem: Update<CartItem>): Observable<Update<CartItem>> {
    return this.http.patch<Update<CartItem>>('/api/cart', cartItem);
  }

  removeCartItem(id: string): Observable<string> {
    return this.http.delete<string>('/api/cart/' + id);
  }

  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order' , order);
  }

  handelOrderSuccess(order: Order){
    if(order != null){
      this.store$.dispatch(orderPlaced({order}));
      console.log(order.id);
      this.store$.dispatch(fromRoot.Go({path: [`orders/confirmation/${order.id}`]}));
    }
  }

  handelOrderFailure({error}){
    console.log(error);
    switch(error.detail){
      case 'Quantity not available':{
        this.snackBar.open('One or more items are not available with the required quantity', '×', { panelClass: 'error', verticalPosition: 'top', duration: 7000 });
        this.store$.dispatch(fromRoot.Go({path: [`cart`]}));
      }
        default:
          return 'Unknown error has occurred, please try again later';
    }
  }
}







import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { selectCartItems, selectTotalPrice } from '../store/selectors/cart-items.selectors';
import { removeCartItem, updateCartItem } from '../store/actions/cart-items.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  public $shoppingCartItems : Observable<CartItem[]>;
  constructor(private store: Store, private cartService: CartService, public productService: ProductService) { }

  ngOnInit() {
    this.$shoppingCartItems = this.store.pipe(select(selectCartItems));
  }

    // Remove cart items
    public removeItem(id: string) {
      this.store.dispatch(removeCartItem({id}));
    }
    selectedQty(quantity: number, id: string){
      const cartItem = {id, changes: {quantity}}
      this.store.dispatch(updateCartItem({cartItem}));
    }

   // Get Total
   public getTotal(){
    return this.store.pipe(select(selectTotalPrice));
  }

}

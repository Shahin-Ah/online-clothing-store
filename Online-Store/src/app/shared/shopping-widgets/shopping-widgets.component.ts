import { CartItem } from './../../models/cart-item.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Go } from 'src/app/store';

@Component({
  selector: 'app-shopping-widgets',
  templateUrl: './shopping-widgets.component.html',
  styleUrls: ['./shopping-widgets.component.scss']
})
export class ShoppingWidgetsComponent     {
  timedOutCloser
  @Input() shoppingCartItems: CartItem[];
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private store: Store, private cartService: CartService , public productService: ProductService) {
  }

  navigate() {
    this.trigger.closeMenu();
    this.store.dispatch(Go({path: ['\cart']}));
  }

  public openMenu(cartLength: number) {
      if(cartLength === 0){
        clearTimeout(this.timedOutCloser);
        this.trigger.openMenu();
      }
    }

  public closeMenu() {
    this.timedOutCloser = setTimeout(()=> this.trigger.closeMenu(), 50);
  }
}

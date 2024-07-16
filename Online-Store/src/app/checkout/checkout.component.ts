import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, first } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { forbiddenNameValidator } from './validators/firstName.validator';
import { Store, select } from '@ngrx/store';
import { selectCartItems, selectCartItemsStateError, selectTotalPrice } from '../store/selectors/cart-items.selectors';
import { placeOrder } from '../store/actions/cart-items.actions';
import { Order } from '../order/models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  public $shoppingCartItems : Observable<CartItem[]>;
  public buyProducts: CartItem[] = [];

  amount: number;
  payments: string[] = ['Fedex', 'Flat Rate', 'Express'];
  paymantWay: string[] = ['Direct Bank Transfer', 'PayPal'];
  billingForm: FormGroup;
  selectedPaymentMethod = "";
  selectedShippingMethod = "";

  constructor(private store: Store, private fb: FormBuilder,
              private cartService: CartService,
              public productService: ProductService) { }

  ngOnInit() {
    //this.cartItems = this.cartService.getItems();
    this.$shoppingCartItems = this.store.pipe(select(selectCartItems));
    //this.getTotal().subscribe(amount => this.amount = amount);

    this.billingForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500), forbiddenNameValidator(/admin/)])],
      lastName: [null, Validators.required],
      company: [null, Validators.required],
      address: [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      city: [null, Validators.required],
      country: [null, Validators.required],
      postalCode: [null, Validators.required],
      email: [null, Validators.compose([Validators.required,Validators.email])],
      phone: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  get firstName(){
    return this.billingForm.get('firstName');
  }

  placeOrder() {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    let order: Order = {
      billingAddressId: 2,
      shippingAddressId: 3,
      userPaymentMethodId: 2,
      shippingMethodId: 1,
      DueDate: date,
      comments: 'test comment'
    }
    this.store.dispatch(placeOrder({order}));
    this.store.pipe(select(selectCartItemsStateError)).subscribe((errorMessage)=>{
      if (errorMessage != null){
        console.log(errorMessage);
      }
    });
  }
  getTotal(){
    return this.store.pipe(select(selectTotalPrice));
  }

  onSubmit() {
    console.log(this.billingForm.value);
  }
}

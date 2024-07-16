import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cartActions } from "../actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CartService } from "src/app/shared/services/cart.service";
import { LoadCartItemsFail, OrderPlacedSuccessfully, addCartItemFail, addCartItemSuccess, allCartItemsLoaded, placeOrderFailed, removeCartItemFail, removeCartItemSuccess, updateCartItemFail, updateCartItemSuccess } from "../actions/cart-items.actions";
import { orderPlaced } from "src/app/order/store/actions/orders.actions";




@Injectable()
export class CartItemsEffect {


  loadCartItems$ = createEffect(
    () => this.actions$.
      pipe(
        ofType(cartActions.loadCartItems),
        exhaustMap(action =>{
          return this.cartService.getCartItems().pipe(
            map(cartItems => allCartItemsLoaded({cartItems})),
            catchError(error => of(LoadCartItemsFail({error})))
          )}
        )
      )
    );

    addCartItem$ = createEffect(
      () => this.actions$.
        pipe(
          ofType(cartActions.addCartItem),
          exhaustMap(action =>{
            return this.cartService.addCartItem(action.cartItem).pipe(
              map(cartItem => addCartItemSuccess({cartItem})),
              catchError(error => of(addCartItemFail({error})))
            )}
          )
        )
    );

    updateCartItem$ = createEffect(
      () => this.actions$.
        pipe(
          ofType(cartActions.updateCartItem),
          exhaustMap(action =>{
            return this.cartService.updateCartItem(action.cartItem).pipe(
              map(cartItem => updateCartItemSuccess({cartItem})),
              catchError(error => of(updateCartItemFail({error})))
            )}
          )
        )
    );

    deleteCartItem$ = createEffect(
      () => this.actions$.
        pipe(
          ofType(cartActions.removeCartItem),
          exhaustMap(action =>{
            return this.cartService.removeCartItem(action.id).pipe(
              map(id => removeCartItemSuccess({id})),
              catchError(error => of(removeCartItemFail({error})))
            )}
          )
        )
    );

    placeOrder$ = createEffect(
      () => this.actions$.
        pipe(
          ofType(cartActions.placeOrder),
          exhaustMap(action =>{
            return this.cartService.placeOrder(action.order).pipe(
              map(order => {
                this.cartService.handelOrderSuccess(order);
                return OrderPlacedSuccessfully()
              }),
              catchError(error => {
                console.log('error');
                this.cartService.handelOrderFailure(error);
                return of(placeOrderFailed(error))
              })
            )}
          )
        )
    );

    constructor(private actions$ : Actions, private cartService: CartService){}
}
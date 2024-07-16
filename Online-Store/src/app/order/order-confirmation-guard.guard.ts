import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isOrderPlaced } from './store/selectors/orders.selectors';

@Injectable({
  providedIn: 'root'
})
export class OrderConfirmationGuard implements CanActivate {

  constructor( private store$: Store){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let isPlaced:boolean = false;
    this.store$.pipe(select(isOrderPlaced)).subscribe(val => isPlaced = val)
    
    return isPlaced;
  }
  
}

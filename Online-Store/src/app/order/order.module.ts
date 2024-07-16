import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    ConfirmationComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    NgxPaginationModule,
    StoreModule.forFeature('orders', reducers),
    //EffectsModule.forFeature(effects)
  ]
})
export class OrderModule { }

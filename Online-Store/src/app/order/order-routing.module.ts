import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderConfirmationGuard } from './order-confirmation-guard.guard';

const routes: Routes = [
  { path: '', component: OrdersComponent},
  {path: 'confirmation/:id', component: ConfirmationComponent, canActivate: [OrderConfirmationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

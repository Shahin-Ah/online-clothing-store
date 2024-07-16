import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ItemsResolver } from './products/resolvers/items.resolver';
import { ProductEditComponent } from './products/product-edit/product-edit.component';



// Routes
const routes: Routes = [
  {
    path: '',
    resolve: {items: ItemsResolver},
    component: ProductsComponent,
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'edit/:id', component: ProductEditComponent }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }

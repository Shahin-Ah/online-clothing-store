import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { SwiperModule } from 'swiper/angular';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { PriceComponent } from './products/price/price.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { BrandsComponent } from './widgets/brands/brands.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { PopularProductsComponent } from './widgets/popular-products/popular-products.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { reducers } from './products/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ItemsHttpService } from './products/services/items-http.service';
import { effects } from './products/store/effects';
import { ItemsResolver } from './products/resolvers/items.resolver';
import { LetModule } from '@ngrx/component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './products/services/customRouteReuseStrategy';
import { ProductEditComponent } from './products/product-edit/product-edit.component';



@NgModule({
  declarations: [
    ProductDialogComponent,
    ProductsComponent,
    ProductComponent,
    PriceComponent,
    ProductDetailsComponent,
    BrandsComponent,
    CategoriesComponent,
    PopularProductsComponent,
    ProductEditComponent
  ],
  imports: [
    //CommonModule,
    SharedModule,
    ShopRoutingModule,
    SwiperModule,
    //LetModule,
    NgxPaginationModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [
    ProductDialogComponent,
  ],

  entryComponents:[
    ProductDialogComponent,
  ],
  providers: [
    ItemsHttpService,
    ItemsResolver,
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ]
})
export class ShopModule { }

import { EffectsModule } from '@ngrx/effects';
import {EntityDataModule} from '@ngrx/data';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SwiperModule } from 'swiper/angular';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { StoreRouterConnectingModule, RouterState, RouterStateSerializer, NavigationActionTiming } from '@ngrx/router-store';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { AppRoutingModule } from './app-routing.module';
import { metaReducers, reducers, effects } from './store';
//import {CustomSerializer} from './store/router/CustomSerializer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { LetModule } from '@ngrx/component';
import { HomeComponent } from './home/home.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductCarouselComponent } from './home/product-carousel/product-carousel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomRouteReuseStrategy } from './shop/products/services/customRouteReuseStrategy';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { OrderModule } from './order/order.module';
import { AuthConfigModule } from './auth-config.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainCarouselComponent,
    ProductCarouselComponent,
    FooterComponent,
    CheckoutComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    //HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    //RouterModule.forRoot(routes),
    AuthConfigModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    ShopModule,
    FlexLayoutModule,
    AppRoutingModule,
    //LetModule,
    OrderModule,
    // eagerly loaded
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        // never allow the state to be mutuated inside the store
        strictStateImmutability: true,
        strictActionImmutability: true,
        //strictActionSerializability: true,
        strictStateSerializability: true
      }
    }),
    EffectsModule.forRoot(effects),
    // passing empty obj since there is no data needed on root
    EntityDataModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      // serializer: CustomSerializer
      //navigationActionTiming: NavigationActionTiming.PostActivation
    })
  ],
  //providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  //providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],

  bootstrap: [AppComponent]
})
export class AppModule {}

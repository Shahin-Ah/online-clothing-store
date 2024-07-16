import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { FlexLayoutModule } from '@angular/flex-layout';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './header/header.component';
import { ShoppingWidgetsComponent } from './shopping-widgets/shopping-widgets.component';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { MenuComponent } from './menu/menu.component';
import { BannersComponent } from './banners/banners.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SidebarComponent } from './sideBar/sidebar.component';
import { CenterMatmenuDirective } from './directives/center-matmenu.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { LetModule } from '@ngrx/component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TShirtFormatPipe } from './pipes/tshirt-format.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ItemsHttpService } from '../shop/products/services/items-http.service';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    ShoppingWidgetsComponent,
    MenuComponent,
    BannersComponent,
    OrderByPipe,
    CenterMatmenuDirective,
    TShirtFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatSliderModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    FlexLayoutModule,
    OverlayModule,
    LetModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatCardModule,
    MatPaginatorModule,
    FlexLayoutModule,
    SidebarComponent,
    HeaderComponent,
    MenuComponent,
    ShoppingWidgetsComponent,
    BannersComponent,
    OrderByPipe,
    TShirtFormatPipe,
    OverlayModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    LetModule
  ],
  providers: [
    ProductService,
    CartService,
    ItemsHttpService
  ]
})
export class SharedModule {}

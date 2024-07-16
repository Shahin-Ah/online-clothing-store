import { Observable, first } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ColorFilter, TagFilter } from 'src/app/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Store, select } from '@ngrx/store';
import { getPagination, getQueryAndRouteParams, selectAllItems, selectFilteredItems, selectMenItems, selectWomenItems } from './store/selectors/items.selectors';
import { Product } from './models/item';
import { CtgFilter, ProductsParams } from './models/ProductsParams';
import { Go } from 'src/app/store';
import {PageEvent} from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import * as _ from 'lodash';
import { isAuthenticatedAndAdmin } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProductsComponent implements OnInit, OnDestroy {

  public sidenavOpen = true;
  public animation: any;
  public sortByOrder = '';
  public tagsFilters  :   TagFilter[] = [];
  public viewType = 'grid';
  public viewCol = 25;
  public colorFilters :   ColorFilter[] = [];

  public items        :   Product[] = [];
  pageEvent: PageEvent;
  length = 13;
  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  public allItems: Observable<Product[]>;
  public tags         :   any[] = [];
  public colors       :   any[] = [];
  public productsParams: ProductsParams = new ProductsParams();
  categoryName = [];
  routeParam: string;
  queryParam: Params;
  resetFilter: boolean;
  filterApplied = false;
  checkedBrands: object;
  checkedCategories: object;
  priceFrom: number;
  priceTo: number;
  pagination$: Observable<Pagination>
  isAuthenticatedAndAdmin$: Observable<boolean>
  constructor(private store: Store ,private productService: ProductService, private route: Router) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


 ngOnInit() {
  this.store.pipe(select(getQueryAndRouteParams)).subscribe(queryRouteParam => this.updateProductsList(queryRouteParam));
  this.isAuthenticatedAndAdmin$ = this.store.pipe(select(isAuthenticatedAndAdmin), first());
}

updateProductsList({queryParams, routeParams}) {
  this.queryParam = queryParams;
  this.routeParam = routeParams.category;
  if(Object.keys(this.queryParam).length === 0){
    this.resetFilter = true;
    this.productsParams = new ProductsParams();
  }
  else if(Object.keys(this.queryParam).length !== 0) {
    this.resetFilter = false;
    this.updateAllFilters(this.queryParam);
  }

  this.allItems = this.store.pipe(select(selectAllItems));

  this.pagination$ = this.store.pipe(select(getPagination));
}

updateCtgQry(ctgQry: CtgFilter){
  const categories = [...this.productsParams.categoryName];
  if (categories.length > 0 &&
      categories.includes(ctgQry.name) && !ctgQry.checked) {
      categories.splice(categories.indexOf(ctgQry.name), 1);
  }
  else if(ctgQry.checked) {
      categories.push(ctgQry.name);
  }
  this.productsParams = {...this.productsParams, categoryName: categories}
}

resetBrandsFilters({reset}){
  if(reset === true)
    this.productsParams = {...this.productsParams, brandName: []};
}

updateBrandsFilters(ctgQry: CtgFilter) {
  const brands: Array<string> = [...this.productsParams.brandName];

  if (brands.length > 0 &&
      brands.includes(ctgQry.name) && !ctgQry.checked) {
      brands.splice(brands.indexOf(ctgQry.name), 1);
  } else if(!brands.includes(ctgQry.name) && ctgQry.checked) {
      brands.push(ctgQry.name);
  }
  this.productsParams = {...this.productsParams, brandName: brands}
}

// Update price filter
public updatePriceFilters(price: object) {
  this.productsParams = {...this.productsParams, ...price};
}

public updateAllFilters(queryParams: Params){
  const checkedBrands = {};
  const brands = [];
  const checkedCategories = {};
  const categories = []
  if(queryParams.brandName !== undefined) {
    if(typeof queryParams?.brandName === 'string'){
        checkedBrands[queryParams?.brandName] = true;
        brands.push(queryParams?.brandName);
    }
    else {
      queryParams?.brandName.forEach(brand => {
          checkedBrands[brand] = true;
          brands.push(brand);
      });
    }
    this.productsParams = {...this.productsParams, brandName: brands};
    this.checkedBrands = {...checkedBrands};
  }
  else if (queryParams.brandName === undefined) { // could be deleted by setting reset to true
    this.productsParams = {...this.productsParams, brandName: []};
    this.checkedBrands = {};
  }

  if(queryParams.categoryName !== undefined) {
    if(typeof queryParams?.categoryName === 'string'){
        checkedCategories[queryParams?.categoryName] = true;
        categories.push(queryParams?.categoryName);
    }
    else {
      queryParams?.categoryName.forEach(category => {
          checkedCategories[category] = true;
          categories.push(category);
      });
    }
    this.productsParams = {...this.productsParams, categoryName: categories};
    this.checkedCategories = {...checkedCategories};
  }
  else if (queryParams.categoryName === undefined) {
    this.productsParams = {...this.productsParams, categoryName: []};
    this.checkedCategories = {};
  }

  if(queryParams.priceFrom) {
    this.priceFrom = queryParams.priceFrom > 1 &&
                     queryParams.priceFrom < 1000?
                     queryParams.priceFrom: 1;

    this.productsParams.priceFrom = this.priceFrom;
  }
  else {
    this.priceFrom = 1;
    this.productsParams.priceFrom = undefined;
  }

 if(queryParams.priceTo) {
    this.priceTo = queryParams.priceTo > 1 &&
                   queryParams.priceTo < 1000?
                   queryParams.priceTo: 1000;

    this.productsParams.priceTo = this.priceTo;
 }
 else {
    this.priceTo = 1000;
    this.productsParams.priceTo = undefined;
  }

}

applyFilter(){
  this.store.dispatch(Go({path: [`/products/${this.routeParam}`], query: this.productsParams}));
}

public handlePageEvent(e: PageEvent){
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.productsParams.pageNumber = e.pageIndex;
    this.productsParams.pageSize = e.pageSize;
    this.store.dispatch(Go({path: [`/products/${this.routeParam}`], query: this.productsParams}));

    window.scrollTo(0,0);
  }

public changeViewType(viewType, viewCol){
  this.viewType = viewType;
  this.viewCol = viewCol;
}
  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
}

// Animation Effect fadeOut
public fadeOut() {
    this.animation = 'fadeOut';
}

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
}



  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
 }
}

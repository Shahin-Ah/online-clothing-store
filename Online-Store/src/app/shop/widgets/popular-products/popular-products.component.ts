import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopularItem } from '../../products/models/item';
import { loadPopularItems } from '../../products/store/actions/items.actions';
import { ProductsState } from '../../products/store/reducers';
import { selectPopularMenItems, selectPopularWomenItems } from '../../products/store/selectors/items.selectors';
import { selectRouteParam } from 'src/app/store/selectors/router.selector';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit {

  public popularProducts: Observable<PopularItem[]>;
  constructor(private store: Store<ProductsState> ) {
  }

   ngOnInit() {
    this.store.pipe(select(selectRouteParam('category'))).subscribe(ctg => this.loadPopularItems(ctg))
  }
  loadPopularItems(category: string) {
    if (category === 'men' || category === 'women'){
      this.store.dispatch(loadPopularItems({category}));
    if(category == 'men')
      this.popularProducts = this.store.pipe(select(selectPopularMenItems));
    else if(category == 'women')
      this.popularProducts = this.store.pipe(select(selectPopularWomenItems));
    }
    console.log(this.popularProducts);
  }
}

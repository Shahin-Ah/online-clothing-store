import { Component, OnInit, Output, EventEmitter, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectQueryParams } from 'src/app/store/selectors/router.selector';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnChanges {


  @Input() priceFrom = 1;
  @Input() priceTo = 1000;
  @Input() reset = false;
  @Output() priceFilters = new EventEmitter();

  // define min, max and range
  public min = 1;
  public max = 1000;

  constructor(private store: Store<AppState>) { }

  priceFilter() {
    if(this.priceFrom > 1 || this.priceTo < 1000){
      this.priceFilters.emit({
        priceFrom: this.priceFrom,
        priceTo: this.priceTo
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['reset'] && changes['reset']['currentValue'] === true){
      this.priceFrom = this.min;
      this.priceTo = this.max;
    }
  }
}

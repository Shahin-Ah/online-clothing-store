import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Brands } from 'src/app/models/brand.model';
import { AppState } from 'src/app/store';
import { getBrands } from 'src/app/store/selectors/utility.selector';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit, OnChanges {

  brands$: Observable<Brands[]>;
  @Input() checked: object = {};
  @Input() reset = false;
  @Output() brandsFilter = new EventEmitter();

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.brands$ = this.store.pipe(select(getBrands));
  }

  UpdateBrandsFltr(checked: boolean, name: string){
    this.brandsFilter.emit({checked, name});
  }

  ngOnChanges(changes: SimpleChanges): void {
    let reset;
    if(changes['reset'] && changes['reset']['currentValue'] === true)
        this.checked = {};
  }
}

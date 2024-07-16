import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/models/categories.model';
import { AppState } from 'src/app/store';
import { CtgFilter } from '../../products/models/ProductsParams';
import { getCtg } from 'src/app/store/selectors/utility.selector';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnChanges {
  categories$: Observable<Categories>;
  @Output() AddCtg = new EventEmitter<CtgFilter>();
  @Input() reset = false;
  @Input() checked: object = {};
  @Input() ctgParam: string;

  constructor(private store: Store<AppState>) {}


  updateCtgList(param: string) {
    this.categories$ = this.store.pipe(select(getCtg(param)));
  }



  UpdateCtg(checked: boolean, name: string){
    this.AddCtg.emit({checked, name});
  }

  ngOnChanges(changes: SimpleChanges): void {
    const reset = changes['reset'];
    if(changes['reset'] && changes['reset']['currentValue'] === true)
        this.checked = {};

    if(changes['ctgParam'] && typeof changes['ctgParam']['currentValue'] === 'string')
        this.updateCtgList(changes['ctgParam']['currentValue']);
  }
}

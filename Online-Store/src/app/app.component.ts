import { Categories } from 'src/app/models/categories.model';
import { SidenavMenu } from './shared/sideBar/sidebar-menu.model';
import { Component, OnInit } from '@angular/core';
import { Observable, filter, finalize, first, tap } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppState } from './store';
import { loadAllBrands, loadAllCategories } from './store/actions/app.actions';
import { getCtgs, getLoading } from './store/selectors/utility.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = false;
  showLoading: Observable<boolean>;
  public categories$: Observable<Categories[]>;
  isLoggedIn$: Observable<boolean>;
  debugger;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router,
    private store: Store<AppState>, private httpClient: HttpClient) {
      this.store.dispatch(loadAllCategories());
      this.store.dispatch(loadAllBrands());
    }

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: '/assets/images/flags/gb.svg' },
    { name:'German', image: '/assets/images/flags/de.svg' },
    { name:'French', image: '/assets/images/flags/fr.svg' },
    { name:'Russian', image: '/assets/images/flags/ru.svg' },
    { name:'Turkish', image: '/assets/images/flags/tr.svg' }
  ]
  public flag:any;
ngOnInit() {
  this.currency = this.currencies[0];
  this.flag = this.flags[0];

  this.categories$ = this.store.pipe(select(getCtgs));
  this.showLoading = this.store.select(getLoading);
  /* this.router.events.subscribe(event => {
  switch (true) {
    case event instanceof NavigationStart: {
      this.loading = true;
        break;
    }
    case event instanceof NavigationEnd:
    case event instanceof NavigationCancel:
    //case event instanceof NavigationError:
    {
        //this.loading = false;
        setTimeout(() => this.loading = false, 1000)
        break;
    }
    default: {
        break;
    }
}
}); */
}


public changeCurrency(currency){
  this.currency = currency;
}
public changeLang(flag){
  this.flag = flag;
}

}

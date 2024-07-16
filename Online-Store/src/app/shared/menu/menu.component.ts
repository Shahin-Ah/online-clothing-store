import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/models/categories.model';
import { AppState } from 'src/app/store';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpHeaders } from '@angular/common/http';
import { AddUserAuthData } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories$: Observable<Categories[]>;

  constructor(private store: Store<AppState>, public oidcSecurityService: OidcSecurityService) {}
  ngOnInit(): void {
    this.categories$ = this.store.select(app => app.utility.categories);
    this.oidcSecurityService.checkAuth().subscribe((userAuthData: LoginResponse) => {
      const { isAuthenticated, userData, accessToken, idToken, configId } = userAuthData;

      this.store.dispatch(AddUserAuthData({userAuthData}));
      console.log('userData', userData);
      console.log('isAuthenticated', isAuthenticated);
      console.log('accessToken', accessToken);
      console.log('idToken', idToken);
      console.log('configId', configId);
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

  callApi() {
    const token = this.oidcSecurityService.getAccessToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }
    });
  }
}

import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { SidebarMenuService } from './sidebar-menu.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/models/categories.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarComponent implements OnInit {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: Categories;
  @Input() depth: number;
  categories$: Observable<Categories[]>;

  constructor(private sidenavMenuService:SidebarMenuService,
     public router: Router, private store: Store<AppState>) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.sidenavMenuService.currentUrl.subscribe((url: string) => {
      if (this.item.name && url) {
        this.expanded = url.indexOf(`/${this.item.name}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }
  onItemSelected(item: Categories) {
    if (!item.subCategory || !item.subCategory.length) {
      this.router.navigate([item.name]);
    }
    if (item.subCategory && item.subCategory.length) {
      this.expanded = !this.expanded;
    }
  }

}

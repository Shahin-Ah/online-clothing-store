import { getOrder } from './../store/selectors/orders.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  order$: Observable<Order>;
  constructor (private store$: Store, private route: ActivatedRoute) {}
  
  
  ngOnInit(): void {
    this.order$ = this.store$.pipe(select(getOrder(this.route.snapshot.params['id'])));
  }

  print(invoice: string){
    const byteArray = new Uint8Array(window.atob(invoice).split('').map(char => char.charCodeAt(0)));
    let blob: Blob = new Blob([byteArray], {type: 'application/pdf'} );
    let url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  download(invoice: string, orderNumber: string){
    const byteArray = new Uint8Array(window.atob(invoice).split('').map(char => char.charCodeAt(0)));
    let blob: Blob = new Blob([byteArray], {type: 'application/pdf'} );
    let url = window.URL.createObjectURL(blob);
    let fileName = `Invoice${orderNumber}`;
    let a = document.createElement('a');
    a.download = fileName;
    a.target = '_blank';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


}

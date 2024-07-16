import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../models/item';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { Store, select } from '@ngrx/store';
import { getIdToken } from 'src/app/store/selectors/auth.selector';
import { first, take } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

 @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
 @Input() product: Product;
 @Input() isAuthenticatedAndAdmin: boolean;
  imgUrl = "../../../assets/images/product/small/exit3/exit1.png";

  constructor(private store$: Store, private oidcSecurityService: OidcSecurityService, private productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    console.log(this.isAuthenticatedAndAdmin);
    this.oidcSecurityService.isAuthenticated$.subscribe(isAuth => console.log(isAuth));

  }

    // Add to wishlist
    public addToWishlist(product: Product) {
      this.wishlistService.addToWishlist(product);
   }

    // Add to compare
    public addToCompare(product: Product) {
      this.productsService.addToCompare(product);
   }


  public openProductDialog(product){
    const dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }
}

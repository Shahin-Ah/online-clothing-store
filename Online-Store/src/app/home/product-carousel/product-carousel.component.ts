import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, { SwiperOptions, Keyboard, Pagination, Navigation, Virtual, Autoplay  } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Product } from 'src/app/shop/products/models/item';
import { ProductDialogComponent } from 'src/app/shop/products/product-dialog/product-dialog.component';
SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay]);

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCarouselComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('product') product: Array<Product> = [];

  public config: SwiperOptions = {
    observer: true,
    slidesPerView: 5,
    spaceBetween: 16,
    keyboard: true,
    navigation: true,
    pagination: false,
    grabCursor: true,
    loop: false,
    preloadImages: false,
    lazy: true,
    breakpoints: {
      480: {
        slidesPerView: 1
      },
      740: {
        slidesPerView: 3,
      },
      960: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      }
    }
  }

  constructor(private dialog: MatDialog, private router: Router, private productService: ProductService, private wishlistService: WishlistService) { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }



  public openProductDialog(product){
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }


   // Add to wishlist
   public addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
 }

    // Add to compare
    public addToCompare(product: Product) {
      this.productService.addToCompare(product);
   }
}

import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit, ViewChild, Output, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { Product, Size } from '../models/item';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/shared/services/cart.service';
import SwiperCore, { SwiperOptions, Keyboard, Pagination, Navigation, Virtual, Autoplay  } from 'swiper';
import { select, Store } from '@ngrx/store';
import { getSelectedItem, itemsLoadError } from '../store';
import { CartItem } from 'src/app/models/cart-item.model';
import { addCartItem } from 'src/app/store/actions/cart-items.actions';
import {Md5} from 'ts-md5';
import { HttpClient } from '@angular/common/http';
import { selectCartItemQuantity } from 'src/app/store/selectors/cart-items.selectors';
SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay]);


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {

 // @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  //@ViewChild('zoomViewer', { static: true }) zoomViewer;
 // @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;
  public product: Product;
  public error$;
  public products: Product[] = [];
  public zoomImage: any;
  public config: SwiperOptions = {};
  public counter = 1;
  index: number;
  color: string;
  size : Size;
  ShowSizeIsNotSelectedError: boolean = false;
  ip: any;
  bigProductImageIndex = 0;

  constructor(@Inject(DOCUMENT) private document: Document,
              private store: Store , private http: HttpClient,
              public productsService: ProductService, public dialog: MatDialog,
              private router: Router, private cartService: CartService) {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        document.body.scrollTop = 0; // scroll top to body element
      }
    });
  }


  ngOnInit() {
    this.store.pipe(select(getSelectedItem)).subscribe(product => this.product = product);
    this.error$ = this.store.pipe(select(itemsLoadError));

    this.document.body.scrollTop = 0;
  }



  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 3
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },


      }
    }
  }

  public slideNavConfig = {
    vertical: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slick',
    arrows: false,
    dots: false,
    focusOnSelect: true
  }


  selectProductOption(color: string){
    this.color = color;
    const selected = this.product.productOptions.find(po => po.color.name === color);
    this.product = {...this.product, selectedProductOption: selected};
  }

  public selectImage(index) {
    this.bigProductImageIndex = index;
  }


  selectedSize(size: Size){
    if(size !== undefined){
      this.size = size;
      this.ShowSizeIsNotSelectedError = false;
    }
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  // Add to cart
  public addToCart(product: Product, quantity) {
    if(this.size === undefined) {
      this.ShowSizeIsNotSelectedError = true;
      return false;
    }
    const cartItem = new CartItem();
    cartItem.productId = product.id;
    cartItem.image = product.selectedProductOption.images[0];
    cartItem.size = this.size.name;
    cartItem.sizeId = this.size.id;
    cartItem.stock = this.size.quantity;
    cartItem.color = product.selectedProductOption.color.name;
    cartItem.price = product.price;
    cartItem.name = product.name;
    cartItem.quantity = this.counter;
    cartItem.brand = product.brand;
    cartItem.category = product.name;
    cartItem.productSubCtg = product.subCategory;
    cartItem.selectedOptionId = product.selectedProductOption.id;
    cartItem.sku = product.selectedProductOption.sku;
    cartItem.id = Md5.hashStr(String(cartItem.productId) +
                           String(cartItem.selectedOptionId) +
                           cartItem.color +
                           cartItem.size);
    this.store.pipe(select(selectCartItemQuantity(cartItem.id)))
    .subscribe((count)=>{
      let isInTheCart = count !== null ? true : false ;
      if(isInTheCart){
        if((count + 1) > cartItem.stock ) {
          alert('This item already exists in your shopping cart!\n You can not add more items');
        } else{
          this.store.dispatch(addCartItem({cartItem}));
        }
      } else{
        this.store.dispatch(addCartItem({cartItem}));
      }
    }).unsubscribe();
  }

  // Add to cart
  public buyNow(product: Product, quantity) {
    if (quantity > 0)
      //this.cartService.addToCart(product, parseInt(quantity));
    this.router.navigate(['/pages/checkout']);
  }

  /* public openProductDialog(product, bigProductImageIndex) {
    let dialogRef = this.dialog.open(ProductZoomComponent,
      {
      data: {product, index: bigProductImageIndex},

      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  } */





  /* public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX / image.offsetWidth * 100;
      y = offsetY / image.offsetHeight * 100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  } */

  /* public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  } */



}



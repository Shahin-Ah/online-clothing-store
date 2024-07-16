import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
//import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import SwiperCore, { SwiperOptions, Keyboard, Pagination, Navigation, Virtual, Autoplay  } from 'swiper';
SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay]);

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainCarouselComponent implements OnInit {

  @Input('slides') slides: Array<any> = [];

  public config: SwiperOptions  = {};

  private pagination = {
    el: '.swiper-pagination',
    clickable: true
  };
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination:  this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }
  }




}

import { Component, OnInit } from '@angular/core';
import { Product } from '../shop/products/models/item';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];
  public banners = [];
  public slides = [
    { title: 'THE BEST CHOICE IS HERE', subtitle: 'New Arrivals On Sale', image: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg' },

  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );

    this.productService.getProducts()
    .subscribe(
      (product: Product[]) => {
        this.products = product
      }
    );
  }

}

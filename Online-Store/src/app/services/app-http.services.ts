import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../shop/products/models/item";
import { Categories } from "../models/categories.model";
import { Brands } from "../models/brand.model";



@Injectable({
  providedIn: 'root'
})
export class AppHttpService {


  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]> {

     return this.http.get<Categories[]>('/api/ProductCategory');
   }

   getBrands(): Observable<Brands[]> {
    return this.http.get<Brands[]>('/api/brands');
  }

}
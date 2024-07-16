import { Product, Image, ProductCategory } from "../shop/products/models/item";

export interface CartItem {
  id: string;
  productId: number;
  image: Image;
  size: string;
  sizeId: number;
  stock: number;
  color: string;
  price: number;
  name: string;
  brand: string;
  category: string;
  productSubCtg: string;
  maxQuantityAllowed: number;
  sku: string;
  selectedOptionId: number;
  quantity: number;
}

 export class CartItem implements CartItem {
  public id: string;
  public productId: number;
  public image: Image;
  public size: string;
  public sizeId: number;
  public stock: number;
  public color: string;
  public price: number;
  public name: string;
  public brand: string;
  public category: string;
  public productSubCtg: string;
  public maxQuantityAllowed: number;
  public sku: string;
  public selectedOptionId: number;
  public quantity: number;
}


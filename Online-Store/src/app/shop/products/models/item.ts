export type ProductSize = 'S' | 'M' | 'L' | 'XL';

//export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';

/* export interface Item {

} */
interface Color {
  id: number;
  name: string;
  value: string;
}
export interface ProductCategory {
  name: string;
  productSubCtg: string;
}
export interface Size {
  id?: number;
  name?: ProductSize;
  quantity?: number;
}
export interface ProductOptions  {
  id?: number;
  color?: Color;
  sizes?: Array<Size>;
  images?: Array<Image>;
  sku?: string;
}
export interface Image {
  id?: any;
  name?: string;
  url?: string;
}

export class Product {
  id?: number;
  seqNo?: number;
  name?: string;
  price?: number;
  salePrice?: number;
  discount?: number;
  sale?: boolean;
  shortDetails?: string;
  description?: string;
  brand?: string;
  material?: string;
  style?: string;
  colors?: Array<Color>
  category?: string;
  subCategory?: string;
  masterProduct?: ProductOptions;
  selectedProductOption?: ProductOptions;
  productOptions?: ProductOptions[];
  constructor(
    id?: number,
    seqNo?: number,
    name?: string,
    price?: number,
    salePrice?: number,
    discount?: number,
    shortDetails?: string,
    description?: string,
    brand?: string,
    material?: string,
    style?: string,
    sale?: boolean,
    colors?: Array<Color>,
    category?: string,
    subCategory?: string,
    masterProduct?: ProductOptions,
    selectedProductOption?: ProductOptions,
    productOptions?: ProductOptions[]
    ) {
    this.id = id;
    this.seqNo = seqNo;
    this.name = name;
    this.price = price;
    this.salePrice = salePrice;
    this.discount = discount;
    this.shortDetails = shortDetails;
    this.description = description;
    this.brand = brand;
    this.material = material;
    this.style = style;
    this.sale = sale;
    this.colors = colors;
    this.category = category;
    this.subCategory = subCategory;
    this.masterProduct = masterProduct;
    this.selectedProductOption = selectedProductOption;
    this.productOptions = productOptions;
  }

}

export class PopularItem extends Product {

}

export function compareItems(i1: Product, i2: Product) {
  const compare = i1.seqNo - i2.seqNo;

  if(compare > 0){
    return 1;
  } else if ( compare<0) {
    return -1;
  } else return 0;
}

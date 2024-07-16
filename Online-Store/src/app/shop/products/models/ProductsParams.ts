export class ProductsParams {
  pageSize?: number = 10;
  pageNumber?: number = 0;
  categoryName?: string[] = [];
  brandName?: string[] = [];
  priceFrom?: number;
  priceTo?: number;
  searchTerm?: string;
}
export class CtgFilter {
  checked?: boolean;
  name?: string;
}


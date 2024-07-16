export interface Categories {
  id: number;
  name: string;
  subCategory : Array<subCategory>;
}

export type subCategory = {
  id: number;
  name: string;
}

export class Categories implements Categories {
  id: number;
  name: string;
  subCategory : Array<subCategory>;

  constructor(
    name: string,
    subCategory : Array<subCategory>
  ){
    this.name = name;
    this.subCategory = subCategory;
  }
}
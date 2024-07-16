export interface Brands{
  id?: number;
  name?: string;
}

export class Brands implements Brands {
  id?: number;
  name?: string;

  constructor(name: string) {
    this.name = name;
  }
}

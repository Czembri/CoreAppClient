import { Moment } from "moment";

export interface IProduct {
  id: number;
  name: string;
  image?: string;
  description: string;
  modificationDate: Moment;
  creationDate: Moment;
  productProperty: IProductProperty[];
}

export interface IProductProperty {
  id: number;
  name: string;
  value: string;
}

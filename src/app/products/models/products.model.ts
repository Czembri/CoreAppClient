import { Moment } from "moment";

export interface IBrowserProductModel {
  id: number;
  name: string;
  description: string;
  creationDate: Moment;
  modificationDate: Moment;
}


export interface IProduct {
  id: number;
  name: string;
  image: string;
  description: string;
  productProperties: IProductProperties;
}

export interface IProductProperties {
  id: number;
  width: string;
  height: string;
  depth: string;
  color: string;
  shape: string;
  purpose: string;
  switchType: string;
}

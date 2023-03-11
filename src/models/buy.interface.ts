export enum IdType {
  CC,
  TI,
}

interface ProductBuy {
  idProduct: string;
  quantity: number;
}

export interface IBuy {
  date?: Date;
  idType: IdType;
  idClient: string;
  clientName: string;
  products: ProductBuy[];
}

export interface IPaginBuy {
  content: IBuy[];
  totalElements: number;
}

export interface IStateBuy {
  isLoading: boolean;
  buys?: IPaginBuy;
  error: string;
}

export enum IButtonActionBuy {
  VER_DETALLE = "VER DETALLE",
}

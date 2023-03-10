export interface IProduct {
  id: string;
  name: string;
  enabled: boolean;
  inInventory: number;
  max: number;
  min: number;
}

export interface IPaginProduct {
  content: IProduct[];
  totalElements: number;
}

export interface IStateProduct {
  isLoading: boolean;
  products?: IPaginProduct;
  error: string;
}

export enum IButtonAction {
  ADD = "AÑADIR",
  EDIT = "EDITAR",
  DELETE = "ELIMINAR",
}

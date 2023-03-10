import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";

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

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
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



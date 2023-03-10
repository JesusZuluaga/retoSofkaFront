import { IStateBuy } from "./buy.interface";
import { IStateProduct } from "./product.interface";

export interface rootReducer {
  myProducts: IStateProduct;
  myBuys: IStateBuy;
}
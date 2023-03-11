import { IPaginProduct, IProduct } from "../models/product.interface";
import { ActionTypeProduct } from "./actionsType/ActionTypeProduct";

export const productLoading = () => {
  return {
    type: ActionTypeProduct.LOADING,
  };
};

export const productLoadSucces = (products: IPaginProduct) => {
  return {
    type: ActionTypeProduct.LOAD_SUCCESS,
    payload: products,
  };
};

export const productLoadError = (error: string) => {
  return {
    type: ActionTypeProduct.LOAD_FAILURE,
    payload: error,
  };
};

export const productDelectSucces = (productId: string) => {
  return {
    type: ActionTypeProduct.DELETE_PRODUCT,
    payload: productId,
  };
};

export const productDeleteError = (error: string) => {
  return {
    type: ActionTypeProduct.LOAD_FAILURE,
    payload: error,
  };
};

export const productCreateSucces = (productToCreate: IProduct) => {
  return {
    type: ActionTypeProduct.CREATE_PRODUCT,
    payload: productToCreate,
  };
};

export const productCreateError = (error: string) => {
  return {
    type: ActionTypeProduct.LOAD_FAILURE,
    payload: error,
  };
};

export const addProductToShoppingCartSuccess = (productToAdd: IProduct) => {
  return {
    type: ActionTypeProduct.ADD_PRODUCT_TO_SHOPPING,
    payload: productToAdd,
  };
};

export const addProductToShoppingCartError = (error: string) => {
  return {
    type: ActionTypeProduct.LOAD_FAILURE,
    payload: error,
  };
};

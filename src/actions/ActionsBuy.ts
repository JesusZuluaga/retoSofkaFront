import { IBuy, IPaginBuy } from "../models/buy.interface";
import { ActionTypeBuy } from "./actionsType/ActionTypeBuy";

export const buyLoading = () => {
  return {
    type: ActionTypeBuy.LOADING_BUY,
  };
};

export const buyLoadSucces = (buys: IPaginBuy) => {
  return {
    type: ActionTypeBuy.LOAD_SUCCESS_BUY,
    payload: buys,
  };
};

export const buyLoadError = (error: string) => {
  return {
    type: ActionTypeBuy.LOAD_FAILURE_BUY,
    payload: error,
  };
};

export const buyDelectSucces = (buyId: string) => {
  return {
    type: ActionTypeBuy.DELETE_BUY,
    payload: buyId,
  };
};

export const buyDeleteError = (error: string) => {
  return {
    type: ActionTypeBuy.LOAD_FAILURE_BUY,
    payload: error,
  };
};

export const buyCreateSucces = (buys: IBuy) => {
  return {
    type: ActionTypeBuy.LOAD_SUCCESS_BUY,
    payload: buys,
  };
};

export const buyCreateError = (error: string) => {
  return {
    type: ActionTypeBuy.LOAD_FAILURE_BUY,
    payload: error,
  };
};
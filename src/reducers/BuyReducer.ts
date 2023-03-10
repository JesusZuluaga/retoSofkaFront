import { ActionTypeBuy } from "../actions/actionsType/ActionTypeBuy";
import { IBuy, IPaginBuy, IStateBuy } from "../models/buy.interface";

const initialState: IStateBuy = {
  isLoading: false,
  buys: undefined,
  error: "",
};

export type BuyActionType =
  | { type: "LOADING_BUY"; payload?: IPaginBuy }
  | { type: "LOAD_SUCCESS_BUY"; payload: IPaginBuy }
  | { type: "LOAD_FAILURE_BUY"; payload: string }
  | { type: "CREATE_BUY"; payload: IBuy }
  | { type: "DELETE_BUY"; payload: string };

const BuyReducer = (state = initialState, action: BuyActionType) => {
  switch (action.type) {
    case ActionTypeBuy.LOADING_BUY:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypeBuy.LOAD_SUCCESS_BUY:
      return {
        ...state,
        isLoading: false,
        buys: action.payload,
      };
    case ActionTypeBuy.LOAD_FAILURE_BUY:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ActionTypeBuy.DELETE_BUY:
      const buy = state.buys?.content.filter(
        (buy) => buy.id !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        error: null,
        buys: { ...state.buys?.content, buy: buy },
      };
    default:
      return state;
  }
};

export default BuyReducer;

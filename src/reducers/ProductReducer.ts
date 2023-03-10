import { ActionTypeProduct } from "../actions/actionsType/ActionTypeProduct";
import { IPaginProduct, IProduct, IStateProduct } from "../models/product.interface";

const initialState: IStateProduct = {
  isLoading: false,
  products: undefined,
  error: "",
};

export type ProductActionType =
  | { type: "LOADING"; payload?: IPaginProduct}
  | { type: "LOAD_SUCCESS";  payload: IPaginProduct}
  | { type: "LOAD_FAILURE"; payload: string}
  | { type: "CREATE_PRODUCT"; payload: IProduct}
  | { type: "DELETE_PRODUCT"; payload: string};

const ProductReducer = ( state = initialState, action: ProductActionType) => {
  switch (action.type) {
    case ActionTypeProduct.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypeProduct.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case ActionTypeProduct.LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

      case ActionTypeProduct.DELETE_PRODUCT:
        const product = state.products?.content.filter(
          (product) => product.id !== action.payload
        );
        return {
          ...state,
          isLoading: false,
          error: null,
          products: { ...state.products?.content, product: product },
        };
    default:
      return state;
  }
};

export default ProductReducer;

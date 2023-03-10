import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  productDelectSucces,
  productDeleteError,
  productLoadError,
  productLoading,
  productLoadSucces,
} from "../../actions/ActionsProduct";
import { IPaginProduct, TableParams } from "../../models/product.interface";
import { ENDPOINT_BASIC } from "../../utils/Api";

export const loadAllProduct = async (
  dispatch: Dispatch<AnyAction>,
  tableParams: TableParams
) => {
  const url = ENDPOINT_BASIC+"product/products";
  dispatch(productLoading());

  await axios
    .get<IPaginProduct>(url, {
      params: {
        size: tableParams.pagination?.pageSize,
        page:
          tableParams.pagination?.current == null ||
          tableParams.pagination?.current < 0
            ? 0
            : tableParams.pagination?.current - 1,
      },
    })
    .then((products) => {
      dispatch(productLoadSucces(products.data));
    })
    .catch((error) => {
      dispatch(productLoadError(error.data));
    });
};

export const deleteProduct = async (
  dispatch: Dispatch<AnyAction>,
  productId: string
) => {
  const url = ENDPOINT_BASIC+"product/deleteProduct/"+productId;
  dispatch(productLoading());
  await axios
    .delete<string>(url)
    .then((products) => {
      dispatch(productDelectSucces(productId));
    })
    .catch((error) => {
      dispatch(productDeleteError(error.data));
    });
};

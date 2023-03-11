import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { buyCreateError, buyCreateSucces, buyLoadError, buyLoading, buyLoadSucces } from "../../actions/ActionsBuy";
import { IBuy, IPaginBuy } from "../../models/buy.interface";
import { TableParams } from "../../models/table.interface";
import { ENDPOINT_BASIC } from "../../utils/Api";

export const loadAllBuy = async (
  dispatch: Dispatch<AnyAction>,
  tableParams: TableParams
) => {
  const url = ENDPOINT_BASIC+"buys/allBuys";
  dispatch(buyLoading());

  await axios
    .get<IPaginBuy>(url, {
      params: {
        size: tableParams.pagination?.pageSize,
        page:
          tableParams.pagination?.current == null ||
          tableParams.pagination?.current < 0
            ? 0
            : tableParams.pagination?.current - 1,
      },
    })
    .then((buys) => {
      dispatch(buyLoadSucces(buys.data));
    })
    .catch((error) => {
      dispatch(buyLoadError(error.data));
    });
};

export const createBuy = async (dispatch: Dispatch<AnyAction>, buyToCreate: IBuy) => {
  const url = ENDPOINT_BASIC+"buys/buyProduct";
  dispatch(buyLoading());
  await axios.post<IBuy>(url, buyToCreate).then((buy) => {
    dispatch(buyCreateSucces(buy.data));
  }). catch((error) => {
    dispatch(buyCreateError(error.data))
  })
}
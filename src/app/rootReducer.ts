import { combineReducers } from "@reduxjs/toolkit";
import BuyReducer from "../reducers/BuyReducer";
import ProductReducer from "../reducers/ProductReducer";

const rootReducer=()=>{

    return combineReducers(
        {
            myProducts:ProductReducer,
            myBuys:BuyReducer
        }
    )
}

export default rootReducer

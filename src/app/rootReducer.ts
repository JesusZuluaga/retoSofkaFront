import { combineReducers } from "@reduxjs/toolkit";
import ProductReducer from "../reducers/ProductReducer";

const rootReducer=()=>{

    return combineReducers(
        {
            myProducts:ProductReducer
        }
    )
}

export default rootReducer

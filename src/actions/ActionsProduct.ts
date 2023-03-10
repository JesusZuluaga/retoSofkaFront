import { IPaginProduct } from "../models/product.interface"
import { ActionTypeProduct } from "./actionsType/ActionTypeProduct"

export const productLoading=()=>{
    return {
        type:ActionTypeProduct.LOADING
    }
}

export const productLoadSucces=(products:IPaginProduct)=>{
    return {
        type:ActionTypeProduct.LOAD_SUCCESS,
        payload:products
    }
}

export const productLoadError=(error:string)=>{
    return {
        type:ActionTypeProduct.LOAD_FAILURE,
        payload:error
    }
}

export const productDelectSucces=(productId:string)=>{
    return {
        type:ActionTypeProduct.DELETE_PRODUCT,
        payload:productId
    }
}

export const productDeleteError=(error:string)=>{
    return {
        type:ActionTypeProduct.LOAD_FAILURE,
        payload:error
    }
}
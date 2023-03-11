import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { IProduct } from "../models/product.interface";
import { addProductToShoppingCart } from "../app/middleware/payloadProducts";

interface IPropsAddProduct {
  data: IProduct;
}

const AddProductButton: FC<IPropsAddProduct> = ({ data }) => {
  const dispatch = useDispatch();

  const addProduct = () => {
    return addProductToShoppingCart(dispatch, data);
  };

  return (
    <Tooltip title="Agregar producto al carrito">
      <PlusCircleOutlined className="add-product" onClick={addProduct} />
    </Tooltip>
  );
};

export default AddProductButton;

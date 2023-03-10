import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../app/middleware/payloadProducts";
import { IButtonAction, IProduct } from "../models/product.interface";

interface IPropsButton {
  data: IProduct;
  button: IButtonAction;
}

const ButtonAction: FC<IPropsButton> = ({ data, button }) => {

    const dispatch = useDispatch();

  const validateButton = (button: IButtonAction) => {
    switch (button) {
      case IButtonAction.DELETE:
        return deleteProduct(dispatch,data.id);
      default:
        return null;
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => validateButton(button)}>
        {button}
      </Button>
    </>
  );
};

export default ButtonAction;

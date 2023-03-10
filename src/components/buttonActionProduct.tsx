import { Button, Modal } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../app/middleware/payloadProducts";
import { IButtonAction, IProduct } from "../models/product.interface";

interface IPropsButton {
  data: IProduct;
  button: IButtonAction;
}

const ButtonActionProduct: FC<IPropsButton> = ({ data, button }) => {
  const dispatch = useDispatch();

  const validateButton = (button: IButtonAction) => {
    switch (button) {
      case IButtonAction.DELETE:
        return deleteProduct(dispatch, data.id);
      default:
        return null;
    }
  };

  return (
    <>
      <Button type="primary" danger onClick={() => validateButton(button)}>
        {button}
      </Button>
    </>
  );
};

export default ButtonActionProduct;

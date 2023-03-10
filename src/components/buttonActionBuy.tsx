import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { IButtonActionBuy, IBuy } from "../models/buy.interface";
import { IStateProduct } from "../models/product.interface";
import { rootReducer } from "../models/reducer.interfaces";
import { formatDate } from "../utils/dates.utils";

interface IPropsButton {
  data: IBuy;
  button: IButtonActionBuy;
}

const ButtonActionBuy: FC<IPropsButton> = ({ data, button }) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const { products } = useSelector<rootReducer, IStateProduct>(
    (state) => state.myProducts
  );

  const validateButton = (button: IButtonActionBuy) => {
    switch (button) {
      case IButtonActionBuy.VER_DETALLE:
        return setmodalOpen(true);
      default:
        return null;
    }
  };

  function getProduct(productId: string) {
    if (products) {
      const product = products.content.find(
        (product) => product.id == productId
      );
      return product ? product.name : "No existe el producto";
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => validateButton(button)}>
        {button}
      </Button>
      <Modal
        title="DETALLES DE COMPRA"
        centered
        open={modalOpen}
        onOk={() => setmodalOpen(false)}
        onCancel={() => setmodalOpen(false)}
        okText="ENTENDIDO"
        cancelText="CERRAR"
        maskClosable={false}
      >
        <p>
          <b>Documento del cliente: </b>
          {data.idType + " " + data.idClient}
        </p>
        <p>
          <b>Nombre del cliente: </b>
          {data.clientName}
        </p>
        <p>
          <b>Fecha de compra: </b>
          {data?.date ? formatDate(new Date(data.date)) : "No contiene fecha"}
        </p>
        <br></br>
        <p className="center-text-modal">
          <b>PRODUCTOS</b>
        </p>
        <hr></hr>
        <br></br>
        {data?.products?.map((product) => {
          return (
            <>
              <p>
                <b>Producto: </b>
                {getProduct(product.idProduct)}
              </p>
              <p>
                <b>Cantidad comprada: </b>
                {product.quantity}
              </p>
              <hr></hr>
            </>
          );
        })}
        <br></br>
      </Modal>
    </>
  );
};

export default ButtonActionBuy;

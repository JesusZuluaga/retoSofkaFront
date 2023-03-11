import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, Badge, Form, Select } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { IProduct, IStateProduct } from "../models/product.interface";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../app/middleware/payloadProducts";
import { IBuy } from "../models/buy.interface";
import { rootReducer } from "../models/reducer.interfaces";
import { createBuy } from "../app/middleware/payloadBuy";
import ProductTable from "../components/tableProduct";
import { object } from "prop-types";

const ProductPage: React.FC = () => {
  const [visible, setVisible] = useState(false); // PARA EL DEL PRODUCTO
  const [open, setOpen] = useState(false); // PARA EL DE LAS COMPRAS
  const [form] = Form.useForm();
  const [formDoBuy] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const dispatch = useDispatch();
  const handleSubmit = (values: IProduct) => {
    values.inInventory > 0 ? (values.enabled = true) : (values.enabled = false);
    createProduct(dispatch, values);

    setVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const areas = [
    { label: "Cedula de ciudadania ", value: "CC" },
    { label: "Tarjeta de identididad", value: "TI" },
  ];

  const handleSubmitBuy = (values: any) => {
    const productValue = Object.keys(values)
      .filter((key) => key.includes("product"))
      .map((key) => {
        return {
          idProduct: key.split("product")[1],
          quantity: values[key],
        };
      });
    values.products = productValue;
    const newBuy: IBuy = {
      date: new Date(),
      idType: values.idType,
      idClient: values.idClient,
      clientName: values.clientName,
      products: productValue,
    };
    createBuy(dispatch, newBuy);

    setOpen(false);
    form.resetFields();
  };

  const handleCancelBuy = () => {
    setOpen(false);
    form.resetFields();
  };

  const state = useSelector<rootReducer, IStateProduct>((state) => {
    return state.myProducts;
  });

  return (
    <div className="products-container">
      <h2 className="products-title">Productos</h2>
      <div className="filtered-buttons">
        <Button type="primary" onClick={showModal}>
          Agregar producto
        </Button>
        <Badge count={state.productsToShop?.productsToBuy.length}>
          <Button onClick={() => setOpen(true)}>
            <ShoppingCartOutlined />
            Realizar compra
          </Button>
        </Badge>
      </div>
      <Modal
        title="Agregar Producto"
        open={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        width={700}
        maskClosable={false}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 650 }}
          onFinish={handleSubmit}
          onFinishFailed={handleCancel}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre del producto"
            name="name"
            preserve
            rules={[
              {
                required: true,
                message: "Por favor agrega el nombre del producto",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Cantidad en inventario"
            name="inInventory"
            preserve
            rules={[
              {
                required: true,
                message:
                  "Por favor ingresa la cantidad del producto en inventario",
              },
            ]}
          >
            <InputNumber style={{ width: 433 }} />
          </Form.Item>

          <Form.Item
            label="Cantidad minima de compra"
            name="min"
            preserve
            rules={[
              {
                required: true,
                message:
                  "Por favor ingresa la cantidad del producto en inventario",
              },
            ]}
          >
            <InputNumber style={{ width: 433 }} />
          </Form.Item>

          <Form.Item
            label="Cantidad maxima de compra"
            name="max"
            preserve
            rules={[
              {
                required: true,
                message:
                  "Por favor ingresa la cantidad del producto en inventario",
              },
            ]}
          >
            <InputNumber style={{ width: 433 }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL HACER COMPRAS */}
      <Modal
        title="Realizar Compra"
        open={open}
        onOk={formDoBuy.submit}
        onCancel={handleCancelBuy}
        width={700}
        maskClosable={false}
      >
        <Form
          form={formDoBuy}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 650 }}
          onFinish={handleSubmitBuy}
          onFinishFailed={handleCancelBuy}
          autoComplete="off"
        >
          <Form.Item
            name="idType"
            label="Tipo de indetificación"
            rules={[{ required: true, message: "Escoge un tipo de identificacion" }]}
          >
            <Select options={areas} />
          </Form.Item>
          <Form.Item
            label="Documento de identidad"
            name="idClient"
            preserve
            rules={[
              {
                required: true,
                message: "Por favor ingrese el número de identificación",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nombre del comprador"
            name="clientName"
            preserve
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {state.productsToShop?.productsToBuy !== undefined ? (
            state.productsToShop?.productsToBuy.map((product, index) => {
              return (
                <div>
                  <hr />
                  <h3>{product.name}</h3>
                  <Form.Item
                    label="Cantidad"
                    name={`product${product.id}`}
                    preserve
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese cantidad a comprar",
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                </div>
              );
            })
          ) : (
            <div>
              <hr />
              <h3>No tienes productos por comprar</h3>
            </div>
          )}
        </Form>
      </Modal>

      <ProductTable />
    </div>
  );
};

export default ProductPage;

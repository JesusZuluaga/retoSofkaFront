import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProduct } from "../app/middleware/payloadProducts";
import {
  IButtonAction,
  IProduct,
  IStateProduct,
} from "../models/product.interface";
import { rootReducer } from "../models/reducer.interfaces";
import { TableParams } from "../models/table.interface";
import ButtonActionProduct from "./buttonActionProduct";

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ProductTable: React.FC = () => {
  const [data, setData] = useState<IProduct[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const dispatch = useDispatch();
  const { products } = useSelector<rootReducer, IStateProduct>(
    (state) => state.myProducts
  );

  useEffect(() => {
    loadAllProduct(dispatch, getRandomuserParams(tableParams));
  }, [JSON.stringify(tableParams)]);

  useEffect(() => {
    if (products) {
      setData(products?.content);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: products?.totalElements,
        },
      });
    }
  }, [products]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IProduct>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Nombre del produto",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Estado",
      dataIndex: "enabled",
      render: (bool) => (bool ? "Disponible" : "No Disponible"),
    },
    {
      title: "Stock",
      dataIndex: "inInventory",
    },
    {
      title: "Maximo de compra",
      dataIndex: "max",
    },
    {
      title: "Minimo de compra",
      dataIndex: "min",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, record) => (
        <>
          <ButtonActionProduct data={record} button={IButtonAction.DELETE} />
        </>
      ),
    },
  ];

  return (
    <div className="home-container">
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ProductTable;

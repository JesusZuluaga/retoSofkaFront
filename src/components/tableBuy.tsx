import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../models/reducer.interfaces";
import { TableParams } from "../models/table.interface";
import { loadAllBuy } from "../app/middleware/payloadBuy";
import { IButtonActionBuy, IBuy, IStateBuy } from "../models/buy.interface";
import ButtonActionBuy from "./buttonActionBuy";
import { formatDate } from "../utils/dates.utils";
import { loadAllProduct } from "../app/middleware/payloadProducts";

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const BuyTable: React.FC = () => {
  const [data, setData] = useState<IBuy[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const dispatch = useDispatch();
  const { buys } = useSelector<rootReducer, IStateBuy>((state) => state.myBuys);

  useEffect(() => {
    loadAllProduct(dispatch, getRandomuserParams(tableParams));
    loadAllBuy(dispatch, getRandomuserParams(tableParams));
  }, [JSON.stringify(tableParams)]);

  useEffect(() => {
    if (buys) {
      setData(buys?.content);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: buys?.totalElements,
        },
      });
    }
  }, [buys]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IBuy>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const columns: ColumnsType<IBuy> = [
    {
      title: "Tipo de identidicación",
      dataIndex: "idType",
      width: "20%",
    },
    {
      title: "Identificación del cliente",
      dataIndex: "idClient",
      width: "20%",
    },
    {
      title: "Nombre del cliente",
      dataIndex: "clientName",
      width: "20%",
    },
    {
      title: "Fecha de compra",
      dataIndex: "date",
      render: (date) => (date ? formatDate(new Date(date)) : null),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, record) => (
        <>
          <ButtonActionBuy
            data={record}
            button={IButtonActionBuy.VER_DETALLE}
          />
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

export default BuyTable;

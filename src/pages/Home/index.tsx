import React, { useEffect } from 'react';
import { Input, Select, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from '../../redux/slices/exchangeRatesSlice';
import { RootState } from '../../redux/store';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { rates, targetAmount, loading } = useSelector((state: RootState) => state.exchangeRates);
  const [amount, setAmount] = React.useState<string>("1");
  const [baseCurrency, setBaseCurrency] = React.useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = React.useState<string>("EUR");

  useEffect(() => {
    dispatch(fetchExchangeRates({ baseCurrency, targetCurrency, amount }));
  }, [amount, baseCurrency, targetCurrency, dispatch]);

  const columns = [
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      sorter: (a: any, b: any) => a.currency.localeCompare(b.currency),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      sorter: (a: any, b: any) => a.rate - b.rate,
      render: (text: number) => text.toFixed(4),
    },
  ];

  const tableData = Object.keys(rates).map((currency) => ({
    key: currency,
    currency,
    rate: rates[currency],
  }));

  return (
    <div style={{ padding: 20 }}>
      <Select
        value={baseCurrency}
        onChange={(value) => setBaseCurrency(value)}
        style={{ width: 200, marginBottom: 20 }}
      >
        {tableData.map((x) => (
          <Select.Option key={x.key} value={x.key}>
            {x.key}
          </Select.Option>
        ))}
      </Select>
      <Input
        placeholder="Base Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Select
        value={targetCurrency}
        onChange={(value) => setTargetCurrency(value)}
        style={{ width: 200, marginBottom: 20 }}
      >
        {tableData.map((x) => (
          <Select.Option key={x.key} value={x.key}>
            {x.key}
          </Select.Option>
        ))}
      </Select>
      <Input
        placeholder="Target Amount"
        type="number"
        disabled
        value={targetAmount}
        style={{ marginBottom: 20 }}
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          style={{ marginTop: 20 }}
        />
      )}
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import { Input, Select, Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchExchangeRates, setTargetAmount, setBaseAmount } from "../../redux/slices/exchangeRatesSlice";
import { RootState } from "../../redux/store";
import { debounce } from "lodash";


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { rates, baseAmount, targetAmount, loading } = useSelector(
    (state: RootState) => state.exchangeRates
  );
  const [amount, setAmount] = React.useState<string>(baseAmount);
  const [baseCurrency, setBaseCurrency] = React.useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = React.useState<string>("EUR");

  const fetchRates = debounce(() => {
   dispatch(fetchExchangeRates({ baseCurrency, targetCurrency, amount }));
  }, 500);

  useEffect(() => {
    fetchRates()
  }, [baseCurrency, targetCurrency, dispatch]);

  const handleBaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    dispatch(setBaseAmount({ baseAmount: newAmount, baseCurrency, targetCurrency }));
  };

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTargetAmount = e.target.value;
    dispatch(setTargetAmount({ targetAmount: newTargetAmount, baseCurrency, targetCurrency }));
  };

  const columns = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      sorter: (a: any, b: any) => a.currency.localeCompare(b.currency),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
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
        value={baseAmount}
        onChange={handleBaseAmountChange}
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
        value={targetAmount}
        onChange={handleTargetAmountChange}
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
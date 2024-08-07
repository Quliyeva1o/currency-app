import React, { useEffect, useState, useCallback } from "react";
import { Input, Select, Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExchangeRates,
  setTargetAmount,
  setBaseAmount,
} from "../../redux/slices/exchangeRatesSlice";
import { RootState } from "../../redux/store";
import { debounce } from "lodash";
import CurrencyInputSelectPair from "./components/CurrencyInputSelectPair/index"; // Import the new component
import styles from "./index.module.scss";

const Home: React.FC = () => {
  // Hooks
  const dispatch = useDispatch();

  // Store
  const { rates, baseAmount, targetAmount, loading } = useSelector(
    (state: RootState) => state.exchangeRates
  );

  // State
  const [amount, setAmount] = useState<string>(baseAmount);
  const [baseCurrency, setBaseCurrency] = useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = useState<string>("EUR");

  // Request
  const fetchRates = useCallback(
    debounce(() => {
      dispatch(fetchExchangeRates({ baseCurrency, targetCurrency, amount }));
    }, 500),
    [baseCurrency, targetCurrency, amount, dispatch]
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'base' | 'target') => {
    const newValue = e.target.value;
    if (type === 'base') {
      setAmount(newValue);
      dispatch(setBaseAmount({ baseAmount: newValue, baseCurrency, targetCurrency }));
    } else {
      dispatch(setTargetAmount({ targetAmount: newValue, baseCurrency, targetCurrency }));
    }
  };

  useEffect(() => {
    fetchRates();
  }, [baseCurrency, targetCurrency, amount, fetchRates]);

  // Table Data
  const tableData = Object.keys(rates).map((currency) => ({
    key: currency,
    currency,
    rate: rates[currency],
  }));

  // Options for Select
  const options = tableData.map((x) => ({
    label: (
      <div style={{ display: "flex" }}>
        <div className={`currency-flag currency-flag-${x.key.toLowerCase()}`}></div>
        <div> {x.key}</div>
      </div>
    ),
    value: x.key,
  }));

  return (
    <div className={styles.main}>
      <h1>Currency Converter App</h1>

      <div className={styles.hero}>
        <div className={styles.div}>
          <div>
            <p>Amount</p>
            <CurrencyInputSelectPair
              amount={baseAmount}
              currency={baseCurrency}
              onAmountChange={(e) => handleAmountChange(e, 'base')}
              onCurrencyChange={setBaseCurrency}
              options={options}
              placeholder="Base Amount"
            />
          </div>
          <div>
            <p>Converted to</p>
            <CurrencyInputSelectPair
              amount={targetAmount}
              currency={targetCurrency}
              onAmountChange={(e) => handleAmountChange(e, 'target')}
              onCurrencyChange={setTargetCurrency}
              options={options}
              placeholder="Target Amount"
            />
          </div>
        </div>
        <p className={styles.text}>
          {baseAmount} {baseCurrency} = <span>{targetAmount} </span>
          {targetCurrency}
        </p>
      </div>

      <div className={styles.myTable}>
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
    </div>
  );
};

export default Home;

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

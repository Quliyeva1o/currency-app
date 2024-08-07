import React, { useEffect } from "react";
import { Input, Select, Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExchangeRates,
  setTargetAmount,
  setBaseAmount,
} from "../../redux/slices/exchangeRatesSlice";
import { RootState } from "../../redux/store";
import { debounce } from "lodash";
import styles from "./index.module.scss";

const Home: React.FC = () => {
  // Hooks
  const dispatch = useDispatch();

  // Store
  const { rates, baseAmount, targetAmount, loading } = useSelector(
    (state: RootState) => state.exchangeRates
  );

  // State
  const [amount, setAmount] = React.useState<string>(baseAmount);
  const [baseCurrency, setBaseCurrency] = React.useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = React.useState<string>("EUR");

  // Request
  const fetchRates = debounce(() => {
    dispatch(fetchExchangeRates({ baseCurrency, targetCurrency, amount }));
  }, 500);

  const handleBaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    dispatch(
      setBaseAmount({ baseAmount: newAmount, baseCurrency, targetCurrency })
    );
  };

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTargetAmount = e.target.value;
    dispatch(
      setTargetAmount({
        targetAmount: newTargetAmount,
        baseCurrency,
        targetCurrency,
      })
    );
  };

  // Effects
  useEffect(() => {
    fetchRates();
  }, [baseCurrency, targetCurrency, dispatch]);

  // Table Data
  const tableData = Object.keys(rates).map((currency) => ({
    key: currency,
    currency,
    rate: rates[currency],
  }));

  return (
    <div className={styles.main}>
      <h1>Currency Converter App</h1>

      <div className={styles.hero}>
        <div className={styles.div}>
          <div>
            <p>Amount</p>
            <div className={styles.inp}>
              <Input
                placeholder="Base Amount"
                type="number"
                value={baseAmount}
                onChange={handleBaseAmountChange}
                style={{ height: 70 }}
              />
              <Select
                value={baseCurrency}
                onChange={(value) => setBaseCurrency(value)}
                style={{ height: 70 }}
              >
                {tableData.map((x) => (
                  <Select.Option key={x.key} value={x.key}>
                    <div style={{ display: "flex" }}>
                      <div
                        className={`currency-flag currency-flag-${x.key.toLowerCase()}`}
                      ></div>
                      <div> {x.key}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <p>Converted to</p>

            <div className={styles.inp}>
              <Input
                placeholder="Target Amount"
                type="number"
                value={targetAmount}
                onChange={handleTargetAmountChange}
                style={{ height: 70 }}
              />
              <Select
                value={targetCurrency}
                onChange={(value) => setTargetCurrency(value)}
                style={{ height: 70 }}
              >
                {tableData.map((x) => (
                  <Select.Option key={x.key} value={x.key}>
                    <div style={{ display: "flex" }}>
                      <div
                        className={`currency-flag currency-flag-${x.key.toLowerCase()}`}
                      ></div>
                      <div> {x.key}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <p className={styles.text}>
          {baseAmount} {baseCurrency} = <span>{targetAmount} </span>
          {targetCurrency}
        </p>
      </div>

      <div className={styles.table}>
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

// const InputsAndSelects = () => {
//   return (
//     <div className={styles.inp}>
//               <Input
//                 placeholder="Target Amount"
//                 type="number"
//                 value={targetAmount}
//                 onChange={handleTargetAmountChange}
//                 style={{ height: 70 }}
//               />
//               <Select
//                 value={targetCurrency}
//                 onChange={(value) => setTargetCurrency(value)}
//                 style={{ height: 70 }}
//               >
//                 {tableData.map((x) => (
//                   <Select.Option key={x.key} value={x.key}>
//                     <div style={{ display: "flex" }}>
//                       <div
//                         className={`currency-flag currency-flag-${x.key.toLowerCase()}`}
//                       ></div>
//                       <div> {x.key}</div>
//                     </div>
//                   </Select.Option>
//                 ))}
//               </Select>
//             </div>
//   )
// };

// const options

import React from "react";
import { Input, Select } from "antd";
import styles from "./index.module.scss";

interface CurrencyInputSelectPairProps {
  amount: string;
  currency: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrencyChange: (value: string) => void;
  options: Array<{ label: React.ReactNode; value: string }>;
  placeholder: string;
}

const CurrencyInputSelectPair: React.FC<CurrencyInputSelectPairProps> = ({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  options,
  placeholder,
}) => (
  <div className={styles.inp}>
    <Input
      placeholder={placeholder}
      type="number"
      value={amount}
      onChange={onAmountChange}
      style={{ height: 55 }}
    />
    <Select
    className="select"
      value={currency}
      onChange={onCurrencyChange}
      options={options}
      style={{ height: 55 }}
    />
  </div>
);

export default CurrencyInputSelectPair;

  import { createSlice } from '@reduxjs/toolkit';

  interface ExchangeRatesState {
    rates: { [key: string]: number };
    targetAmount: string;
    baseAmount: string;
    loading: boolean;
    error: string | null;
  }

  const initialState: ExchangeRatesState = {
    rates: {},
    targetAmount: '0.92',
    baseAmount: '1',
    loading: false,
    error: null,
  };

  interface SetAmountPayload {
    targetAmount?: string;
    baseAmount?: string;
    baseCurrency?: string;
    targetCurrency?: string;
  }

  const exchangeRatesSlice = createSlice({
    name: 'exchangeRates',
    initialState,
    reducers: {
      setTargetAmount(state, action) {
        const { targetAmount, targetCurrency } = action.payload as SetAmountPayload;
        const targetRate = state.rates[targetCurrency || ''];
        if (targetRate) {
          const baseAmount = (parseFloat(targetAmount || '0') / targetRate).toFixed(2);
          state.targetAmount = targetAmount || '';
          state.baseAmount = baseAmount;
        }
      },
      setBaseAmount(state, action) {
        const { baseAmount, baseCurrency, targetCurrency } = action.payload as SetAmountPayload;
        const baseRate = state.rates[baseCurrency || ''];
        const targetRate = state.rates[targetCurrency || ''];
        if (baseRate && targetRate) {
          const targetAmount = (parseFloat(baseAmount || '0') * (targetRate / baseRate)).toFixed(2);
          state.baseAmount = baseAmount || '';
          state.targetAmount = targetAmount;
        }
      },
      setExchangeRates(state, action) {
        state.rates = action.payload.rates;
        state.loading = false;
        state.error = null;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      setError(state, action) {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });

  export const {
    setTargetAmount,
    setBaseAmount,
    setExchangeRates,
    setLoading,
    setError
  } = exchangeRatesSlice.actions;

  export default exchangeRatesSlice.reducer;

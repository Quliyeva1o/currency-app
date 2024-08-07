import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../API/freeCurrencyApi';

interface ExchangeRatesState {
  rates: { [key: string]: number };
  targetAmount: string;
  baseAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: ExchangeRatesState = {
  rates: {},
  targetAmount: '',
  baseAmount: '1',
  loading: false,
  error: null,
};

interface FetchExchangeRatesParams {
  baseCurrency: string;
  targetCurrency: string;
  amount: string;
}

export const fetchExchangeRates:any = createAsyncThunk(
  'exchangeRates/fetchExchangeRates',
  async ({ baseCurrency, targetCurrency, amount }: FetchExchangeRatesParams) => {
    try {
      const response = await api.latest({ base_currency: baseCurrency });
      const rates = response.data;
      const targetRate = rates[targetCurrency];
      const targetAmount = targetRate ? (parseFloat(amount) * targetRate).toFixed(2) : '';
      return { rates, targetAmount, baseAmount: amount };
    } catch (error) {
      throw new Error('Error fetching exchange rates');
    }
  }
);

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    setTargetAmount(state, action) {
      const { targetAmount, baseCurrency, targetCurrency } = action.payload;
      const targetRate = state.rates[targetCurrency];
      const baseAmount = targetRate ? (parseFloat(targetAmount) / targetRate).toFixed(2) : '';
      state.targetAmount = targetAmount;
      state.baseAmount = baseAmount;
    },
    setBaseAmount(state, action) {
      const { baseAmount, baseCurrency, targetCurrency } = action.payload;
      const baseRate = state.rates[baseCurrency];
      const targetRate = state.rates[targetCurrency];
      const targetAmount = baseRate && targetRate ? (parseFloat(baseAmount) * (targetRate / baseRate)).toFixed(2) : '';
      state.baseAmount = baseAmount;
      state.targetAmount = targetAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.rates = action.payload.rates;
        state.targetAmount = action.payload.targetAmount;
        state.baseAmount = action.payload.baseAmount;
        state.loading = false;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setTargetAmount, setBaseAmount } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
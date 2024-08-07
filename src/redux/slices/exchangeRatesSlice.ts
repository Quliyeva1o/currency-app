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
  async ({ baseCurrency, targetCurrency, amount }: FetchExchangeRatesParams, { rejectWithValue }) => {
    try {
      return await api.fetchExchangeRates(baseCurrency, targetCurrency, amount);
    } catch (error) {
      return rejectWithValue('Error fetching exchange rates');
    }
  }
);

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    setTargetAmount(state, action) {
      const { targetAmount, targetCurrency } = action.payload;
      const targetRate = state.rates[targetCurrency];
      const baseAmount = api.calculateBaseAmount(targetAmount, targetRate);
      state.targetAmount = targetAmount;
      state.baseAmount = baseAmount;
    },
    setBaseAmount(state, action) {
      const { baseAmount, baseCurrency, targetCurrency } = action.payload;
      const baseRate = state.rates[baseCurrency];
      const targetRate = state.rates[targetCurrency];
      const targetAmount = api.calculateBaseAmountFromRates(baseAmount, baseRate, targetRate);
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
        state.error = action.payload as string || 'Something went wrong';
      });
  },
});

export const { setTargetAmount, setBaseAmount } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;

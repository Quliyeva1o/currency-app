import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../API/freeCurrencyApi'; 

interface ExchangeRatesState {
  rates: { [key: string]: number };
  targetAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: ExchangeRatesState = {
  rates: {},
  targetAmount: '',
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
      return { rates, targetAmount };
    } catch (error) {
      throw new Error('Error fetching exchange rates');
    }
  }
);

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.rates = action.payload.rates;
        state.targetAmount = action.payload.targetAmount;
        state.loading = false;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default exchangeRatesSlice.reducer;

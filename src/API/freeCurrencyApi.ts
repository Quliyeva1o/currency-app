import { API_KEY, API_URL } from "./constants";

export async function sendRequest(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<any> {
  const paramString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}${endpoint}?${paramString}`, {
    headers: {
      apikey: API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

class Freecurrencyapi {
  async getExchangeRates(
    baseCurrency: string
  ): Promise<{ [key: string]: number }> {
    const data = await sendRequest("latest", { base_currency: baseCurrency });
    return data.data;
  }

  calculateTargetAmount(amount: string, targetRate: number): string {
    return targetRate ? (parseFloat(amount) * targetRate).toFixed(2) : "";
  }

  calculateBaseAmount(targetAmount: string, targetRate: number): string {
    return targetRate ? (parseFloat(targetAmount) / targetRate).toFixed(2) : "";
  }

  calculateBaseAmountFromRates(
    baseAmount: string,
    baseRate: number,
    targetRate: number
  ): string {
    return baseRate && targetRate
      ? (parseFloat(baseAmount) * (targetRate / baseRate)).toFixed(2)
      : "";
  }

  async fetchExchangeRates(
    baseCurrency: string,
    targetCurrency: string,
    amount: string
  ) {
    try {
      const rates = await this.getExchangeRates(baseCurrency);
      const targetRate = rates[targetCurrency];
      const targetAmount = this.calculateTargetAmount(amount, targetRate);
      return { rates, targetAmount, baseAmount: amount };
    } catch (error) {
      throw new Error("Error fetching exchange rates");
    }
  }
}

const api = new Freecurrencyapi();
export default api;

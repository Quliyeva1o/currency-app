import { API_KEY, API_URL } from "./constants";

class Freecurrencyapi {
  baseUrl = API_URL;

  headers = {
    apikey: API_KEY,
  };

  call(endpoint: string, params = {}) {
    const paramString = new URLSearchParams(params).toString();
    return fetch(`${this.baseUrl}${endpoint}?${paramString}`, {
      headers: this.headers,
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  latest(params: {} | undefined) {
    return this.call("latest", params);
  }
}

const api = new Freecurrencyapi();
export default api;

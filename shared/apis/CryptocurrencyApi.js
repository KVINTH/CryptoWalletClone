/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function getCurrencyInfo() {
  const params = new URLSearchParams({
    ids: 'bitcoin,ethereum',
    vs_currencies: 'usd',
    include_24hr_change: true,
  }).toString();

  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?${params}`);
  return response.data;
}

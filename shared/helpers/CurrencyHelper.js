import 'intl';
import 'intl/locale-data/jsonp/en';

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function calculateFiatBalance(currencyPrice, currencyBalance) {
  return currencyPrice * currencyBalance;
}

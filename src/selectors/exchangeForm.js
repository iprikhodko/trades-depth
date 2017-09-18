import { createSelector } from 'reselect';
import { isNumber } from '../lib/number-utils';

export default function createExchangeFormSelectors() {
  const getExchangeForm = exchangeForm => exchangeForm;

  const getTotalPrice = createSelector(
    getExchangeForm,
    (exchangeForm, orders) => orders,
    ({ count }, orders) => {
      const result = {
        count: parseFloat(count),
        total: 0,
      };

      orders.every(({ volume, price }) => {
        if (volume >= result.count) {
          result.total += result.count * price;
          result.count = 0;
          return false;
        }

        result.count -= volume;
        result.total += volume * price;

        return true;
      });

      return result.total;
    },
  );

  const getError = createSelector(
    getExchangeForm,
    (exchangeForm, maxVolume) => maxVolume,
    (exchangeForm, maxVolume) => {
      const count = exchangeForm.count.trim();

      if (count === '') {
        return '';
      }

      if (!isNumber(parseFloat(count))) {
        return 'notNumber';
      }

      if (count < 0) {
        return 'lessZero';
      }

      if (count > maxVolume) {
        return 'moreTotal';
      }

      return '';
    },
  );

  return {
    getTotalPrice,
    getError,
  };
}

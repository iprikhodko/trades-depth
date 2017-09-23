import { createSelector } from 'reselect';

export default function createOrdersSelectors() {
  const getData = data => data;

  const getTotalAmount = createSelector(
    getData,
    orders => orders.reduce((totalAmount, { volume }) => totalAmount + (+volume), 0),
  );

  const getTotalPrice = createSelector(
    getData,
    orders => orders.reduce((totalPrice, { volume, price }) =>
      totalPrice + ((+volume) * (+price)), 0),
  );

  const getAveragePrice = createSelector(
    getTotalPrice,
    getTotalAmount,
    (totalPrice, totalAmount) => {
      const averagePrice = totalPrice / totalAmount;
      return isNaN(averagePrice) ? 0 : averagePrice;
    },
  );

  return {
    getTotalAmount,
    getTotalPrice,
    getAveragePrice,
  };
}

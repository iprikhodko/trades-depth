import { createSelector } from 'reselect';

const MAX_COUNT_IN_SHORT_LIST = 10;

export default function createOrderBookSelectors() {
  const getOrderBook = orderBook => orderBook;

  const getBuyOrders = createSelector(
    getOrderBook,
    ({ buyOrders }) => buyOrders,
  );

  const getSellOrders = createSelector(
    getOrderBook,
    ({ sellOrders }) => sellOrders,
  );

  const getShortBuyOrders = createSelector(
    getBuyOrders,
    buyOrders => buyOrders.slice(0, MAX_COUNT_IN_SHORT_LIST),
  );

  const getShortSellOrders = createSelector(
    getSellOrders,
    sellOrders => sellOrders.slice(0, MAX_COUNT_IN_SHORT_LIST),
  );

  const getIsListOverflow = createSelector(
    getBuyOrders,
    getSellOrders,
    (buyOrders, sellOrders) => (
      buyOrders.length > MAX_COUNT_IN_SHORT_LIST ||
      sellOrders.length > MAX_COUNT_IN_SHORT_LIST
    ),
  );

  const getMaxVolume = orders =>
    orders.reduce((total, { volume }) =>
      total + parseFloat(volume), 0);

  const getMaxVolumeBuyOrders = createSelector(
    getBuyOrders,
    getMaxVolume,
  );

  const getMaxVolumeSellOrders = createSelector(
    getSellOrders,
    getMaxVolume,
  );

  return {
    getBuyOrders,
    getSellOrders,
    getShortBuyOrders,
    getShortSellOrders,
    getIsListOverflow,
    getMaxVolumeBuyOrders,
    getMaxVolumeSellOrders,
  };
}

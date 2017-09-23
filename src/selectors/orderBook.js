import { createSelector } from 'reselect';

const MAX_COUNT_IN_SHORT_LIST = 10;

export default function createOrderBookSelectors() {
  const getOrderBook = orderBook => orderBook;

  const getBuyTable = createSelector(
    getOrderBook,
    ({ buyOrders }) => buyOrders,
  );

  const getSellTable = createSelector(
    getOrderBook,
    ({ sellOrders }) => sellOrders,
  );

  const getBuyOrders = createSelector(
    getBuyTable,
    table => table.data,
  );

  const getSellOrders = createSelector(
    getSellTable,
    table => table.data,
  );

  const getShortList = getListSelector =>
    createSelector(
      getListSelector,
      orders => orders.slice(0, MAX_COUNT_IN_SHORT_LIST),
    );
  const getShortBuyOrders = getShortList(getBuyOrders);
  const getShortSellOrders = getShortList(getSellOrders);

  const getIsListExpanded = createSelector(
    getOrderBook,
    ({ isExpanded }) => isExpanded,
  );

  const getIsListOverflow = createSelector(
    getBuyOrders,
    getSellOrders,
    (buyOrders, sellOrders) => (
      buyOrders.length > MAX_COUNT_IN_SHORT_LIST ||
      sellOrders.length > MAX_COUNT_IN_SHORT_LIST
    ),
  );

  const getPreparedList = (getList, getShortListSelector) =>
    createSelector(
      getList,
      getShortListSelector,
      getIsListExpanded,
      getIsListOverflow,
      (orders, shortOrders, isExpanded, isListOverflow) => (
        isListOverflow && !isExpanded ? shortOrders : orders
      ),
    );
  const getPreparedBuyOrders = getPreparedList(getBuyOrders, getShortBuyOrders);
  const getPreparedSellOrders = getPreparedList(getSellOrders, getShortSellOrders);

  const getSlicedList = getTable =>
    createSelector(
      getTable,
      ({ data, selectedRowIndex }) => data.slice(0, selectedRowIndex + 1),
    );
  const getSlicedBuyOrders = getSlicedList(getBuyTable);
  const getSlicedSellOrders = getSlicedList(getSellTable);

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
    getPreparedBuyOrders,
    getPreparedSellOrders,
    getSlicedBuyOrders,
    getSlicedSellOrders,
    getIsListOverflow,
    getMaxVolumeBuyOrders,
    getMaxVolumeSellOrders,
  };
}

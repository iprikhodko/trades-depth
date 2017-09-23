import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import { createSelector } from 'reselect';
import {
  selectRow as onRowSelect,
  unselectRow as onRowUnselect,
} from '../actions/table';
import createOrderBookSelectors from '../selectors/orderBook';
import OrderTable from '../components/OrderTable';

export default connectAdvanced((dispatch) => {
  const {
    getPreparedBuyOrders,
    getPreparedSellOrders,
    getSlicedBuyOrders,
    getSlicedSellOrders,
  } = createOrderBookSelectors();

  const actions = bindActionCreators({
    onRowSelect,
    onRowUnselect,
  }, dispatch);

  const actionSelectors = createSelector(
    tableId => tableId,
    tableId => ({
      onRowSelect: index => actions.onRowSelect({ index, tableId }),
      onRowUnselect: index => actions.onRowUnselect({ index, tableId }),
    }),
  );

  return ({
    orderBook,
    orderBook: {
      currency,
      convolutedCurrency,
    },
  }, {
    id,
    ...otherOwnProps
  }) => {
    const orderTable = orderBook[id];
    const { selectedRowIndex } = orderTable;

    let data;
    let slicedData;
    let preferPlacePopup;

    if (id === 'buyOrders') {
      data = getPreparedBuyOrders(orderBook);
      slicedData = getSlicedBuyOrders(orderBook);
      preferPlacePopup = 'right';
    } else {
      data = getPreparedSellOrders(orderBook);
      slicedData = getSlicedSellOrders(orderBook);
      preferPlacePopup = 'left';
    }

    return ({
      data,
      slicedData,
      selectedRowIndex,
      currency,
      convolutedCurrency,
      preferPlacePopup,
      ...otherOwnProps,
      ...actionSelectors(id),
    });
  };
})(OrderTable);

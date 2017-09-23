import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import {
  toggleExpand as onToggleExpand,
  selectRow as onRowSelect,
  unselectRow as onRowUnselect,
} from '../actions/orderBook';
import createOrderBookSelectors from '../selectors/orderBook';
import OrderBook from '../components/OrderBook';

export default connectAdvanced((dispatch) => {
  const {
    getBuyOrders,
    getSellOrders,
    getShortBuyOrders,
    getShortSellOrders,
    getIsListOverflow,
  } = createOrderBookSelectors();

  const actions = bindActionCreators({
    onToggleExpand,
    onRowSelect,
    onRowUnselect,
  }, dispatch);

  return ({
    orderBook,
    orderBook: {
      isExpanded: isListExpanded,
      selectedRowIndex,
    },
  }) => ({
    buyOrders: isListExpanded ? getBuyOrders(orderBook) : getShortBuyOrders(orderBook),
    sellOrders: isListExpanded ? getSellOrders(orderBook) : getShortSellOrders(orderBook),
    selectedRowIndex,
    isListExpanded,
    isListOverflow: getIsListOverflow(orderBook),
    ...actions,
  });
})(OrderBook);

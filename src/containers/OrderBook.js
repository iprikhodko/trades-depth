import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import { toggleExpand as onToggleExpand } from '../actions/orderBook';
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
  }, dispatch);

  return ({ orderBook, orderBook: { isExpanded: isListExpanded } }) => ({
    buyOrders: isListExpanded ? getBuyOrders(orderBook) : getShortBuyOrders(orderBook),
    sellOrders: isListExpanded ? getSellOrders(orderBook) : getShortSellOrders(orderBook),
    isListExpanded,
    isListOverflow: getIsListOverflow(orderBook),
    ...actions,
  });
})(OrderBook);

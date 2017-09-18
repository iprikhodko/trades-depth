import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import createExchangeFormSelectors from '../selectors/exchangeForm';
import createOrderBookSelectors from '../selectors/orderBook';
import { changeField as onChange } from '../actions/exchangeForm';
import ExchangeForm from '../components/ExchangeForm';


export default connectAdvanced((dispatch) => {
  const {
    getTotalPrice,
    getError,
  } = createExchangeFormSelectors();

  const {
    getBuyOrders,
    getSellOrders,
    getMaxVolumeBuyOrders,
    getMaxVolumeSellOrders,
  } = createOrderBookSelectors();

  const actions = bindActionCreators({
    onChange,
  }, dispatch);

  return ({
    exchangeForm,
    exchangeForm: {
      type,
    },
    orderBook,
    orderBook: {
      convolutedCurrency,
      currency,
    },
  }) => {
    const isBuy = type === 'buy';
    return ({
      form: exchangeForm,
      convolutedCurrency,
      currency,
      totalPrice: getTotalPrice(
        exchangeForm,
        isBuy ?
          getSellOrders(orderBook) :
          getBuyOrders(orderBook),
      ),
      error: getError(
        exchangeForm,
        isBuy ?
          getMaxVolumeSellOrders(orderBook) :
          getMaxVolumeBuyOrders(orderBook),
      ),
      ...actions,
    });
  };
})(ExchangeForm);

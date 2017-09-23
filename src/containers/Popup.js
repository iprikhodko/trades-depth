import { connectAdvanced } from 'react-redux';
import createOrdersSelectors from '../selectors/orders';
import Popup from '../components/Popup';

export default connectAdvanced(() => {
  const {
    getTotalAmount,
    getTotalPrice,
    getAveragePrice,
  } = createOrdersSelectors();

  return (state, { orders, currency, convolutedCurrency }) => ({
    totalAmount: getTotalAmount(orders),
    totalPrice: getTotalPrice(orders),
    averagePrice: getAveragePrice(orders),
    currency: currency.toUpperCase(),
    convolutedCurrency: convolutedCurrency.toUpperCase(),
  });
})(Popup);

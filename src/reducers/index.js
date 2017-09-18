import { combineReducers } from 'redux';
import orderBook from './orderBook';
import exchangeForm from './exchangeForm';

export default combineReducers({
  orderBook,
  exchangeForm,
});

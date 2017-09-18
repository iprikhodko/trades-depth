import { createReducer } from '../lib/reducer-utils';
import ACTIONS from '../constants/actions';

const initialState = {
  buyOrders: [],
  sellOrders: [],
  isExpanded: false,
  currency: '',
  convolutedCurrency: '',
};

const orderBookReducer = createReducer({
  [ACTIONS.TOGGLE_EXPAND](state) {
    return {
      ...state,
      isExpanded: !state.isExpanded,
    };
  },
  [ACTIONS.FETCH_ORDERS](state, { bid, ask, currency, convolutedCurrency }) {
    return {
      ...state,
      buyOrders: bid,
      sellOrders: ask,
      currency,
      convolutedCurrency,
    };
  },
}, initialState);

export default orderBookReducer;

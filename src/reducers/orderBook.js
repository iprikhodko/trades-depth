import { createReducer, childReducerWrapper } from '../lib/reducer-utils';
import { setData } from '../actions/table';
import tableReducer from '../reducers/table';
import ACTIONS from '../constants/actions';

const initialState = {
  buyOrders: tableReducer(undefined, {}),
  sellOrders: tableReducer(undefined, {}),
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
    let newState = childReducerWrapper({
      buyOrders: tableReducer,
    }, state, setData(bid));

    newState = childReducerWrapper({
      sellOrders: tableReducer,
    }, newState, setData(ask));

    return {
      ...newState,
      currency,
      convolutedCurrency,
    };
  },
}, initialState);

export default (state, action) => {
  let newState = orderBookReducer(state, action);

  if (action.tableId === 'buyOrders') {
    newState = childReducerWrapper({
      buyOrders: tableReducer,
    }, state, action);
  }

  if (action.tableId === 'sellOrders') {
    newState = childReducerWrapper({
      sellOrders: tableReducer,
    }, newState, action);
  }

  return newState;
};

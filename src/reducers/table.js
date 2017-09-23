import { createReducer } from '../lib/reducer-utils';
import ACTIONS from '../constants/actions';

const initialState = {
  data: [],
  selectedRowIndex: -1,
};

const orderBookReducer = createReducer({
  [ACTIONS.SET_DATA](state, { data }) {
    return {
      ...state,
      data,
    };
  },
  [ACTIONS.SELECT_ROW](state, { index: selectedRowIndex }) {
    return {
      ...state,
      selectedRowIndex,
    };
  },
  [ACTIONS.UNSELECT_ROW](state) {
    return {
      ...state,
      selectedRowIndex: -1,
    };
  },
}, initialState);

export default orderBookReducer;

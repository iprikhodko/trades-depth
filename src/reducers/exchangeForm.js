import { createReducer } from '../lib/reducer-utils';
import ACTIONS from '../constants/actions';

const initialState = {
  count: '',
  type: 'buy',
};

const exchangeFormReducer = createReducer({
  [ACTIONS.CHANGE_FIELD](state, { fieldName, value }) {
    return {
      ...state,
      [fieldName]: value,
    };
  },
}, initialState);

export default exchangeFormReducer;

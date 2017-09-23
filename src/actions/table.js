import ACTIONS from '../constants/actions';

export const setData = (data = []) => ({
  type: ACTIONS.SET_DATA,
  data,
});

export const selectRow = ({ index, tableId }) => ({
  type: ACTIONS.SELECT_ROW,
  index,
  tableId,
});

export const unselectRow = ({ index, tableId }) => ({
  type: ACTIONS.UNSELECT_ROW,
  index,
  tableId,
});

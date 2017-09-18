import ACTIONS from '../constants/actions';

export const changeField = (fieldName, value) => ({
  type: ACTIONS.CHANGE_FIELD,
  fieldName,
  value,
});

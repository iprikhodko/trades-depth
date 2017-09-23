export function createReducer(handleActions, initialState = {}) {
  return function reducer(...args) {
    const [state = initialState, action] = args;
    return handleActions[action.type] ? handleActions[action.type](...args) : state;
  };
}

export const childReducerWrapper = (hashReducers = {}, state, ...otherParams) =>
  Object
    .entries(hashReducers)
    .reduce((newState, [propName, reducer]) => {
      const currChildState = newState[propName];
      const newChildState = reducer(currChildState, ...otherParams);

      if (newChildState !== currChildState) {
        return {
          ...newState,
          [propName]: newChildState,
        };
      }

      return newState;
    }, state);

export function createReducer(handleActions, initialState = {}) {
  return function reducer(...args) {
    const [state = initialState, action] = args;
    return handleActions[action.type] ? handleActions[action.type](...args) : state;
  };
}

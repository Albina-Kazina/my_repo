export const createReducerByMap = (reducerMapping, initialState = {}) => (state = initialState, action) => {
    return reducerMapping[action.type] ? reducerMapping[action.type](state, action.payload) : state;
  }
  
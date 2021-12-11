import * as actions from '../actionTypes';

const INITIAL_STATE = {
  list: [],
};

const artworksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.ADD_ARTWORK:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case actions.REMOVE_ARTWORK:
      return {
        ...state,
        list: state.list.filter(artwork => artwork !== action.payload),
      };
    default:
      return state;
  }
};

export default artworksReducer;

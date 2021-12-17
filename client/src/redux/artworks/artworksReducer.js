import * as actions from '../actionTypes';

const INITIAL_STATE = {
  list: [],
};

const artworksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_ARTWORKS:
    case actions.SET_USER_ARTWORKS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default artworksReducer;

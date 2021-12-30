import * as actions from '../actionTypes';

const INITIAL_STATE = {
  list: [],
};

const scoresReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_SCORES:
      return {
        ...state,
        list: action.payload,
      };
    case actions.REMOVE_SCORES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default scoresReducer;

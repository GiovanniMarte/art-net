import * as actions from '../actionTypes';

const INITIAL_STATE = {
  list: [],
};

const communitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_COMMUNITIES:
      return {
        ...state,
        list: action.payload,
      };
    case actions.REMOVE_COMMUNITIES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default communitiesReducer;

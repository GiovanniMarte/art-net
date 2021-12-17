import * as actions from '../actionTypes';

const INITIAL_STATE = {
  user: null,
  followers: [],
};

const galleryUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_GALLERY_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actions.SET_GALLERY_USER_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case actions.REMOVE_GALLERY_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default galleryUserReducer;

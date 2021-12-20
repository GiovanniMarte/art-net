import * as actions from '../actionTypes';

const INITIAL_STATE = {
  profileImage: '',
  displayName: '',
  bio: '',
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_SETTINGS_IMAGE_URL:
      return {
        ...state,
        profileImage: action.payload,
      };
    case actions.SET_SETTINGS_NAME:
      return {
        ...state,
        displayName: action.payload,
      };
    case actions.SET_SETTINGS_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case actions.CLEAR_SETTINGS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default settingsReducer;

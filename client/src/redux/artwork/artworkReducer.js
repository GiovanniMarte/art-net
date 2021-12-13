import * as actions from '../actionTypes';

const INITIAL_STATE = {
  imageUrl: 'https://picsum.photos/id/212/800/533',
  communities: [],
  title: '',
  description: '',
  isVisible: true,
};

const artworkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload,
      };
    case actions.ADD_COMMUNITY:
      return {
        ...state,
        communities: [...state.communities, action.payload],
      };
    case actions.REMOVE_COMMUNITY:
      return {
        ...state,
        communities: state.communities.filter(community => community.id !== action.payload.id),
      };
    case actions.SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case actions.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case actions.CHANGE_VISIBILITY:
      return {
        ...state,
        isVisible: action.payload,
      };
    default:
      return state;
  }
};

export default artworkReducer;

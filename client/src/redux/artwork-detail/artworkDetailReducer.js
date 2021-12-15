import * as actions from '../actionTypes';

const INITIAL_STATE = {
  hasData: false,
  currentArtworkDetail: {
    comments: [],
  },
};

const artworkDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_ARTWORK_DETAIL:
      return {
        ...state,
        hasData: true,
        currentArtworkDetail: { ...action.payload, comments: state.currentArtworkDetail.comments },
      };
    case actions.SET_ARTWORK_DETAIL_COMMENTS:
      return {
        ...state,
        currentArtworkDetail: { ...state.currentArtworkDetail, comments: action.payload },
      };
    case actions.REMOVE_ARTWORK_DETAIL:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default artworkDetailReducer;

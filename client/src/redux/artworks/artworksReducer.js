import * as actions from '../actionTypes';

const INITIAL_STATE = {
  list: [],
};

const artworksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_ARTWORKS:
      return {
        ...state,
        list: action.payload,
      };
    case actions.UPVOTE_ARTWORK:
      return {
        ...state,
        list: state.list.map(artwork =>
          artwork.id === action.payload ? { ...artwork, score: artwork.score + 1 } : artwork
        ),
      };
    case actions.DOWNVOTE_ARTWORK:
      return {
        ...state,
        list: state.list.map(artwork =>
          artwork.id === action.payload ? { ...artwork, score: artwork.score - 1 } : artwork
        ),
      };
    default:
      return state;
  }
};

export default artworksReducer;

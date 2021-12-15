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
    case actions.UPDATE_ARTWORK:
      return {
        ...state,
        list: state.list.map(artwork =>
          artwork.id === action.payload.id
            ? { ...action.payload, comments: artwork.comments }
            : artwork
        ),
      };
    case actions.SET_ARTWORK_COMMENTS:
      return {
        ...state,
        list: state.list.map(artwork =>
          artwork.id === action.payload.artworkId
            ? { ...artwork, comments: action.payload.comments }
            : artwork
        ),
      };
    default:
      return state;
  }
};

export default artworksReducer;

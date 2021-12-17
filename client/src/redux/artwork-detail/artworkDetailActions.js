import * as actions from '../actionTypes';

export const setArtworkDetail = artwork => ({
  type: actions.SET_ARTWORK_DETAIL,
  payload: artwork,
});

export const removeArtworkDetail = () => ({
  type: actions.REMOVE_ARTWORK_DETAIL,
});

export const setArtworkDetailComments = comments => ({
  type: actions.SET_ARTWORK_DETAIL_COMMENTS,
  payload: comments,
});

export const setArtworkDetailScores = scores => ({
  type: actions.SET_ARTWORK_DETAIL_SCORES,
  payload: scores,
});

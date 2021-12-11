import * as actions from '../actionTypes';

export const setImageUrl = artwork => ({
  type: actions.ADD_ARTWORK,
  payload: artwork,
});

export const addCommunity = artwork => ({
  type: actions.REMOVE_ARTWORK,
  payload: artwork,
});

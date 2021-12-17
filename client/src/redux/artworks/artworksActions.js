import * as actions from '../actionTypes';

export const setArtworks = artworks => ({
  type: actions.SET_ARTWORKS,
  payload: artworks,
});

export const setUserArtworks = artworks => ({
  type: actions.SET_USER_ARTWORKS,
  payload: artworks,
});

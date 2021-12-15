import * as actions from '../actionTypes';

export const setArtworks = artworks => ({
  type: actions.SET_ARTWORKS,
  payload: artworks,
});

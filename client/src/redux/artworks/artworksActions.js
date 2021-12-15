import * as actions from '../actionTypes';

export const setArtworks = artworks => ({
  type: actions.SET_ARTWORKS,
  payload: artworks,
});

export const updateArtwork = artwork => ({
  type: actions.UPDATE_ARTWORK,
  payload: artwork,
});

export const setArtworkComments = (artworkId, comments) => ({
  type: actions.SET_ARTWORK_COMMENTS,
  payload: { artworkId, comments },
});

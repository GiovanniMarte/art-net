import * as actions from '../actionTypes';

export const setArtworks = artworks => ({
  type: actions.SET_ARTWORKS,
  payload: artworks,
});

export const upvoteArtwork = artworkId => ({
  type: actions.UPVOTE_ARTWORK,
  payload: artworkId,
});

export const downvoteArtwork = artworkId => ({
  type: actions.DOWNVOTE_ARTWORK,
  payload: artworkId,
});

import * as actions from '../actionTypes';

export const setGalleryUser = user => ({
  type: actions.SET_GALLERY_USER,
  payload: user,
});

export const setGalleryUserFollowers = followers => ({
  type: actions.SET_GALLERY_USER_FOLLOWERS,
  payload: followers,
});

export const removeGalleryUser = () => ({
  type: actions.REMOVE_GALLERY_USER,
});

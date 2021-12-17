import * as actions from '../actionTypes';

export const setGalleryUser = user => ({
  type: actions.SET_GALLERY_USER,
  payload: user,
});

export const removeGalleryUser = () => ({
  type: actions.REMOVE_GALLERY_USER,
});

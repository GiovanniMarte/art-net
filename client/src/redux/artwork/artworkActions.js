import * as actions from './artworkActionTypes';

export const setImageUrl = imageUrl => ({
  type: actions.SET_IMAGE_URL,
  payload: imageUrl,
});

export const addCommunity = community => ({
  type: actions.ADD_COMMUNITY,
  payload: community,
});

export const removeCommunity = community => ({
  type: actions.REMOVE_COMMUNITY,
  payload: community,
});

export const setTitle = title => ({
  type: actions.SET_TITLE,
  payload: title,
});

export const setDescription = description => ({
  type: actions.SET_DESCRIPTION,
  payload: description,
});

export const changeVisibility = isVisible => ({
  type: actions.CHANGE_VISIBILITY,
  payload: isVisible,
});

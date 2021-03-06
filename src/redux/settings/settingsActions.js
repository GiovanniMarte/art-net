import * as actions from '../actionTypes';

export const setSettingsName = name => ({
  type: actions.SET_SETTINGS_NAME,
  payload: name,
});

export const setSettingsBio = bio => ({
  type: actions.SET_SETTINGS_BIO,
  payload: bio,
});

export const clearSettings = () => ({
  type: actions.CLEAR_SETTINGS,
});

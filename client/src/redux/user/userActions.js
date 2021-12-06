import * as actions from './userActionTypes';

export const setCurrentUser = user => ({
  type: actions.SET_CURRENT_USER,
  payload: user,
});

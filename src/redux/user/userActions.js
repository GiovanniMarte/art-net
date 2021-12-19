import * as actions from '../actionTypes';

export const setCurrentUser = user => ({
  type: actions.SET_CURRENT_USER,
  payload: user,
});

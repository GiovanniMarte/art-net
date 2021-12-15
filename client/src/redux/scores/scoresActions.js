import * as actions from '../actionTypes';

export const setScores = scores => ({
  type: actions.SET_SCORES,
  payload: scores,
});

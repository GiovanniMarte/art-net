import * as actions from '../actionTypes';

export const setScores = scores => ({
  type: actions.SET_SCORES,
  payload: scores,
});

export const removeScores = () => ({
  type: actions.REMOVE_SCORES,
});

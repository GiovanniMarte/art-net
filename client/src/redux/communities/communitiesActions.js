import * as actions from '../actionTypes';

export const setCommunities = communities => ({
  type: actions.SET_COMMUNITIES,
  payload: communities,
});

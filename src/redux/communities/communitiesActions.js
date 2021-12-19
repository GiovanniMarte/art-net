import * as actions from '../actionTypes';

export const setCommunities = communities => ({
  type: actions.SET_COMMUNITIES,
  payload: communities,
});

export const removeCommunities = () => ({
  type: actions.REMOVE_COMMUNITIES,
});

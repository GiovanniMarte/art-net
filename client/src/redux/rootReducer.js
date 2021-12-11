import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import artworkReducer from './artwork/artworkReducer';
import artworksReducer from './artworks/artworksReducer';
import communitiesReducer from './communities/communitiesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  artwork: artworkReducer,
  artworks: artworksReducer,
  communities: communitiesReducer,
});

export default rootReducer;

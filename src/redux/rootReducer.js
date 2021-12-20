import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import artworkReducer from './artwork/artworkReducer';
import artworksReducer from './artworks/artworksReducer';
import communitiesReducer from './communities/communitiesReducer';
import artworkDetailReducer from './artwork-detail/artworkDetailReducer';
import scoresReducer from './scores/scoresReducer';
import galleryUserReducer from './galleryUser/galleryUserReducer';
import settingsReducer from './settings/settingsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  galleryUser: galleryUserReducer,
  artwork: artworkReducer,
  artworkDetail: artworkDetailReducer,
  artworks: artworksReducer,
  communities: communitiesReducer,
  scores: scoresReducer,
  settings: settingsReducer,
});

export default rootReducer;

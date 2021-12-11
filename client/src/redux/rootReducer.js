import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import artworkReducer from './artwork/artworkReducer';
import artworksReducer from './artworks/artworksReducer';

const rootReducer = combineReducers({
  user: userReducer,
  artwork: artworkReducer,
  artworks: artworksReducer,
});

export default rootReducer;

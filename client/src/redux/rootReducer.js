import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import artworkReducer from './artwork/artworkReducer';

const rootReducer = combineReducers({ user: userReducer, artwork: artworkReducer });

export default rootReducer;

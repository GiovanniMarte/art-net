import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const middleware = [logger];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

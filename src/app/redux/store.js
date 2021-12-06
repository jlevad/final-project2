import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './userRedux';
import cartReducer from './cartRedux';

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

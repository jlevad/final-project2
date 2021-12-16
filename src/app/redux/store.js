import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './userRedux';
import cartReducer from './cartRedux';
import productReducer from './productRedux';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

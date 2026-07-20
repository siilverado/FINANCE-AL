import { configureStore, combineReducers } from '@reduxjs/toolkit';

import complexReducer from './complexSlice';
import sportReducer from './sportSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  sport: sportReducer,
  complex: complexReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;

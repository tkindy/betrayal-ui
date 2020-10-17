import { combineReducers } from '@reduxjs/toolkit';
import zoomReducer from './features/zoom';

export const rootReducer = combineReducers({
  zoom: zoomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

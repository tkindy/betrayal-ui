import { combineReducers } from '@reduxjs/toolkit';
import zoomReducer from './features/zoom';
import roomStackReducer from './features/roomStack';

export const rootReducer = combineReducers({
  zoom: zoomReducer,
  roomStack: roomStackReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

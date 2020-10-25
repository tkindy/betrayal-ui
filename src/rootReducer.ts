import { combineReducers } from '@reduxjs/toolkit';
import zoomReducer from './features/zoom';
import roomStackReducer from './features/roomStack';
import boardReducer from './features/board';

export const rootReducer = combineReducers({
  zoom: zoomReducer,
  roomStack: roomStackReducer,
  board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

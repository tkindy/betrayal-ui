import { combineReducers } from '@reduxjs/toolkit';
import zoomReducer from './features/zoom';
import roomStackReducer from './features/roomStack';
import boardReducer from './features/board';
import playersReducer from './features/players';

export const rootReducer = combineReducers({
  zoom: zoomReducer,
  roomStack: roomStackReducer,
  board: boardReducer,
  players: playersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

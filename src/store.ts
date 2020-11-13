import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from '@reduxjs/toolkit';
import zoomReducer from './features/zoom';
import roomStackReducer from './features/roomStack';
import boardReducer from './features/board';
import playersReducer from './features/players';

const rootReducer = combineReducers({
  zoom: zoomReducer,
  roomStack: roomStackReducer,
  board: boardReducer,
  players: playersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import zoomReducer from './features/zoom';
import roomStackReducer from './features/roomStack';
import cardStacksReducer from './features/cardStacks';
import boardReducer from './features/board';
import playersReducer from './features/players';
import gameReducer from './features/game';

const rootReducer = combineReducers({
  game: gameReducer,
  zoom: zoomReducer,
  roomStack: roomStackReducer,
  cardStacks: cardStacksReducer,
  board: boardReducer,
  players: playersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

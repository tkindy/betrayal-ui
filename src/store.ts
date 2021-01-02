import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import zoomReducer from './features/zoom';
import roomStackReducer from './features/roomStack';
import cardStacksReducer from './features/cardStacks';
import boardReducer from './features/board';
import playersReducer from './features/players';
import gameReducer from './features/game';
import reduxWebsocket from '@giantmachines/redux-websocket';
import { GameUpdate } from './features/models';

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
  middleware: getDefaultMiddleware().concat([
    reduxWebsocket({
      deserializer: (message) => JSON.parse(message),
      dateSerializer: (date) => date.getUTCMilliseconds(),
    }),
  ]),
});

export type RootState = ReturnType<typeof rootReducer>;

export interface GameUpdatePayload {
  message: GameUpdate;
}

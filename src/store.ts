import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import lobbyReducer from './features/lobby';
import zoomReducer from './features/zoom';
import roomStackReducer from './features/roomStack';
import cardStacksReducer from './features/cardStacks';
import boardReducer from './features/board';
import playersReducer from './features/players';
import gameReducer from './features/game';
import diceRollsReducer from './features/diceRolls';
import monstersReducer from './features/monsters';
import reduxWebsocket from '@giantmachines/redux-websocket';
import { GameUpdate, LobbyUpdate } from './features/models';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  game: gameReducer,
  zoom: zoomReducer,
  roomStack: roomStackReducer,
  cardStacks: cardStacksReducer,
  board: boardReducer,
  players: playersReducer,
  diceRolls: diceRollsReducer,
  monsters: monstersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      reduxWebsocket({
        deserializer: (message) => JSON.parse(message),
        dateSerializer: (date) => date.getUTCMilliseconds(),
      }),
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface LobbyUpdatePayload {
  message: LobbyUpdate;
}
export interface GameUpdatePayload {
  message: GameUpdate;
}

import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import { Player } from './models';
import * as api from '../api/api';
import { equal, GridLoc } from '../components/game/board/grid';
import { RootState } from '../store';
import {
  getBoardMap,
  getGameId,
  getPlayers as selectPlayers,
} from './selectors';
import { get } from '../board';
import { createAsyncThunk } from './utils';
import { giveDrawnCardToPlayer } from './cardStacks';

export const getPlayers = createAsyncThunk(
  'players/getStatus',
  async (_, { getState }) => {
    return api.getPlayers(getGameId(getState()));
  }
);

interface MovePlayerPayload {
  id: number;
  loc: GridLoc;
}

export const movePlayer = createAsyncThunk(
  'board/movePlayerStatus',
  ({ id, loc }: MovePlayerPayload, { getState }) => {
    return api.movePlayer(getGameId(getState()), id, loc);
  }
);

export const playerDropped: (
  id: number,
  loc: GridLoc
) => ThunkAction<void, RootState, unknown, Action<string>> = (id, loc) => (
  dispatch,
  getState
) => {
  const map = getBoardMap(getState())!!;
  if (!get(map, loc)) {
    return;
  }

  const { loc: originalLoc } = selectPlayers(getState())!!.find(
    (player) => player.id === id
  )!!;
  if (equal(originalLoc, loc)) {
    return;
  }

  dispatch(movePlayer({ id, loc }));
};

interface PlayersState {
  players?: Player[];
  selectedPlayerId?: number;
}

const initialState: PlayersState = {};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    switchSelectedPlayer(state, { payload: playerId }: PayloadAction<number>) {
      state.selectedPlayerId = playerId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayers.fulfilled, (state, { payload: players }) => {
        state.players = players;
        state.selectedPlayerId = players[0].id;
      })
      .addCase(movePlayer.fulfilled, (state, { payload: players }) => {
        state.players = players;
      })
      .addCase(
        giveDrawnCardToPlayer.fulfilled,
        (state, { payload: player }) => {
          state.players = state.players?.map((p) =>
            p.id === player.id ? player : p
          );
        }
      );
  },
});

export const { switchSelectedPlayer } = playersSlice.actions;
export default playersSlice.reducer;

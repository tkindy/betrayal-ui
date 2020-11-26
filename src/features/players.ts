import { Action, createSlice, ThunkAction } from '@reduxjs/toolkit';
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
}

const initialState: PlayersState = {};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlayers.fulfilled, (state, { payload: players }) => {
        state.players = players;
      })
      .addCase(movePlayer.fulfilled, (state, { payload: players }) => {
        state.players = players;
      });
  },
});

export default playersSlice.reducer;

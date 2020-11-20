import { Action, createSlice, ThunkAction } from '@reduxjs/toolkit';
import { Player, PlayerColor } from './models';
import * as api from '../api/api';
import { equal, GridLoc } from '../components/game/board/grid';
import { RootState } from '../store';
import {
  getBoardMap,
  getGameCode,
  getPlayers as selectPlayers,
} from './selectors';
import { get } from '../board';
import { createAsyncThunk } from './utils';

export const getPlayers = createAsyncThunk(
  'players/getStatus',
  async (_, { getState }) => {
    return api.getPlayers(getGameCode(getState()));
  }
);

interface MovePlayerPayload {
  color: PlayerColor;
  loc: GridLoc;
}

export const movePlayer = createAsyncThunk(
  'board/movePlayerStatus',
  ({ color, loc }: MovePlayerPayload, { getState }) => {
    return api.movePlayer(getGameCode(getState()), color, loc);
  }
);

export const playerDropped: (
  color: PlayerColor,
  loc: GridLoc
) => ThunkAction<void, RootState, unknown, Action<string>> = (color, loc) => (
  dispatch,
  getState
) => {
  const map = getBoardMap(getState())!!;
  if (!get(map, loc)) {
    return;
  }

  const { loc: originalLoc } = selectPlayers(getState())!!.find(
    (player) => player.color === color
  )!!;
  if (equal(originalLoc, loc)) {
    return;
  }

  dispatch(movePlayer({ color, loc }));
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

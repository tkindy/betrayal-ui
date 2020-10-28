import {
  Action,
  createAsyncThunk,
  createSlice,
  ThunkAction,
} from '@reduxjs/toolkit';
import { Player, PlayerColor } from './models';
import * as api from '../api/api';
import { equal, GridLoc } from '../components/board/grid';
import { RootState } from '../rootReducer';
import { getBoardMap, getPlayers as selectPlayers } from './selectors';
import { get } from '../board';

export const getPlayers = createAsyncThunk('players/getStatus', api.getPlayers);

interface MovePlayerPayload {
  color: PlayerColor;
  loc: GridLoc;
}

export const movePlayer = createAsyncThunk(
  'board/movePlayerStatus',
  ({ color, loc }: MovePlayerPayload) => api.movePlayer(color, loc)
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

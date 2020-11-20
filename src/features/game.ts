import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api/api';

export const createGame = createAsyncThunk('game/createGame', api.createGame);
export const joinGame = createAsyncThunk('game/joinGame', api.joinGame);

interface GameState {
  gameCode?: string;
}

const initialState: GameState = {};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGame.fulfilled, (state, { payload: gameCode }) => {
        state.gameCode = gameCode;
      })
      .addCase(joinGame.fulfilled, (state, { payload: gameCode }) => {
        state.gameCode = gameCode;
      });
  },
});

export const {} = gameSlice.actions;
export default gameSlice.reducer;

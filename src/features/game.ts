import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  gameCode?: string;
}

const initialState: GameState = {};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    joinGame(state, { payload: gameCode }: PayloadAction<string>) {
      state.gameCode = gameCode;
    },
  },
});

export const { joinGame } = gameSlice.actions;
export default gameSlice.reducer;

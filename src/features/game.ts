import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  gameId?: string;
}

const initialState: GameState = {};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    joinGame(state, { payload: gameId }: PayloadAction<string>) {
      state.gameId = gameId;
    },
  },
});

export const { joinGame } = gameSlice.actions;
export default gameSlice.reducer;

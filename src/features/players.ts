import { createSlice } from '@reduxjs/toolkit';
import { Player } from './models';

interface PlayersState {
  players?: Player[];
}

const initialState: PlayersState = {};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
});

export default playersSlice.reducer;

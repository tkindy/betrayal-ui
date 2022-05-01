import { createSlice } from '@reduxjs/toolkit';
import { LobbyPlayer } from './models';
import { addLobbyUpdateCase } from './utils';

interface LobbyState {
  lobbyId?: string;
  players?: LobbyPlayer[];
}

const initialState: LobbyState = {};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    joinLobby(state, { payload: lobbyId }) {
      state.lobbyId = lobbyId;
    },
  },
  extraReducers: (builder) => {
    addLobbyUpdateCase(builder, (state, { payload: { message } }) => {
      state.players = message.players;
    });
  },
});

export const { joinLobby } = lobbySlice.actions;
export default lobbySlice.reducer;

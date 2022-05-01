import { createSlice } from '@reduxjs/toolkit';
import { LobbyPlayer } from './models';
import { addLobbyUpdateCase } from './utils';

interface LobbyState {
  lobbyId?: string;
  name?: string;
  players?: LobbyPlayer[];
}

const initialState: LobbyState = {};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setName(state, { payload: name }) {
      state.name = name;
    },
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

export const {setName, joinLobby } = lobbySlice.actions;
export default lobbySlice.reducer;

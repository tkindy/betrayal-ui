import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LobbyState {
  lobbyId?: string;
  name?: string;
  players?: string[];
}

const initialState: LobbyState = {};

interface PlayersMessage {
  type: 'players';
  players: string[];
}

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
    receiveLobbyMessage(state, { payload }: PayloadAction<PlayersMessage>) {
      state.players = payload.players;
    },
  },
});

export const { setName, joinLobby, receiveLobbyMessage } = lobbySlice.actions;
export default lobbySlice.reducer;

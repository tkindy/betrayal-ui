import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

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
    joinLobby(state, { payload: { lobbyId, name } }) {
      state.lobbyId = lobbyId;
      state.name = name;
    },
    receiveLobbyMessage(state, { payload }: PayloadAction<PlayersMessage>) {
      state.players = payload.players;
    },
  },
});

export const joinLobby =
  (lobbyId: string, name: string) => (dispatch: AppDispatch) => {
    if (process.env.NODE_ENV === 'production') {
      localStorage.setItem(lobbyId, name);
    }
    dispatch(lobbySlice.actions.joinLobby({ lobbyId, name }));
  };

export const { receiveLobbyMessage } = lobbySlice.actions;
export default lobbySlice.reducer;

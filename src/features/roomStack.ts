import { createSlice } from '@reduxjs/toolkit';
import { placeRoom } from './board';
import { FlippedRoom, StackRoom } from './models';
import * as api from '../api/api';
import { getGameId } from './selectors';
import { createAsyncThunk } from './utils';

export const getRoomStack = createAsyncThunk(
  'roomStack/getStatus',
  async (_, { getState }) => {
    return api.getRoomStack(getGameId(getState()));
  }
);

export const skipRoom = createAsyncThunk(
  'roomStack/skipStatus',
  async (_, { getState }) => {
    return api.skipRoom(getGameId(getState()));
  }
);

export const flipRoomStack = createAsyncThunk(
  'roomStack/flipStatus',
  async (_, { getState }) => {
    return api.flipRoom(getGameId(getState()));
  }
);

export const rotateFlipped = createAsyncThunk(
  'roomStack/rotateStatus',
  async (_, { getState }) => {
    return api.rotateFlipped(getGameId(getState()));
  }
);

export interface RoomStackState {
  nextRoom?: StackRoom;
  flippedRoom?: FlippedRoom;
}

const initialState: RoomStackState = {};

const roomStackSlice = createSlice({
  name: 'roomStack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomStack.fulfilled, (_state, { payload: newState }) => {
        return newState;
      })
      .addCase(flipRoomStack.fulfilled, (state, { payload: flippedRoom }) => {
        delete state.nextRoom;
        state.flippedRoom = flippedRoom;
      })
      .addCase(rotateFlipped.fulfilled, (state, { payload: flippedRoom }) => {
        state.flippedRoom = flippedRoom;
      })
      .addCase(placeRoom.fulfilled, (state, { payload: { nextRoom } }) => {
        delete state.flippedRoom;
        state.nextRoom = nextRoom;
      })
      .addCase(skipRoom.fulfilled, (state, { payload: nextRoom }) => {
        state.nextRoom = nextRoom;
      });
  },
});

export default roomStackSlice.reducer;

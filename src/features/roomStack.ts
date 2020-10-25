import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { placeRoom } from './board';
import { FlippedRoom, StackRoom } from './models';
import * as api from '../api/api';

export const getStackRoom = createAsyncThunk(
  'roomStack/getStatus',
  api.getStackRoom
);

export const flipRoomStack = createAsyncThunk(
  'roomStack/flipStatus',
  api.flipRoom
);

export const rotateFlipped = createAsyncThunk(
  'roomStack/rotateStatus',
  api.rotateFlipped
);

export interface RoomStackState {
  nextRoom?: StackRoom;
  flippedRoom?: FlippedRoom;
}

const initialState: RoomStackState = {};

const roomStackSlice = createSlice({
  name: 'roomStack',
  initialState,
  reducers: {
    nextRoom(state, action: PayloadAction<StackRoom>) {
      state.nextRoom = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStackRoom.fulfilled, (state, { payload: room }) => {
        state.nextRoom = room;
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
      });
  },
});

export const { nextRoom } = roomStackSlice.actions;
export default roomStackSlice.reducer;

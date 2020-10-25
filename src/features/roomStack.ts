import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Direction } from '../components/room/Room';

export enum Floor {
  BASEMENT,
  GROUND,
  UPPER,
  ROOF,
}

export interface StackRoom {
  possibleFloors: Floor[];
}

export interface FlippedRoom {
  name: string;
  doorDirections: Direction[];
}

const flipRoomStack = createAsyncThunk('roomStack/flipStatus', async () => {
  return {
    name: 'Graveyard',
    doorDirections: [Direction.NORTH, Direction.EAST],
  } as FlippedRoom;
});

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
    builder.addCase(
      flipRoomStack.fulfilled,
      (state, { payload: flippedRoom }) => {
        state.flippedRoom = flippedRoom;
      }
    );
  },
});

export const { nextRoom } = roomStackSlice.actions;
export default roomStackSlice.reducer;

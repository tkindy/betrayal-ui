import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum Floor {
  BASEMENT,
  GROUND,
  UPPER,
  ROOF,
}

interface StackRoom {
  possibleFloors: Floor[];
}

interface RoomStackState {
  nextRoom?: StackRoom;
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
});

export const { nextRoom } = roomStackSlice.actions;
export default roomStackSlice.reducer;

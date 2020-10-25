import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { GridLoc } from '../components/board/grid';
import { Direction } from '../components/room/Room';
import { RootState } from '../rootReducer';

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

export const flipRoomStack = createAsyncThunk(
  'roomStack/flipStatus',
  async () => {
    return {
      name: 'Graveyard',
      doorDirections: [Direction.NORTH, Direction.EAST],
    } as FlippedRoom;
  }
);

export const rotateFlipped = createAsyncThunk<
  FlippedRoom | undefined,
  void,
  { state: RootState }
>('roomStack/rotateStatus', async (_, thunkAPI) => {
  const room = thunkAPI.getState().roomStack.flippedRoom;

  if (!room) {
    return;
  }

  const { name, doorDirections } = room;
  return {
    name,
    doorDirections: doorDirections.map((dir) => {
      return dir - 90;
    }),
  };
});

export const openSpotClicked = createAction<GridLoc>(
  'roomStack/openSpotClicked'
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
      .addCase(flipRoomStack.fulfilled, (state, { payload: flippedRoom }) => {
        state.flippedRoom = flippedRoom;
      })
      .addCase(rotateFlipped.fulfilled, (state, { payload: flippedRoom }) => {
        state.flippedRoom = flippedRoom;
      });
  },
});

export const { nextRoom } = roomStackSlice.actions;
export default roomStackSlice.reducer;

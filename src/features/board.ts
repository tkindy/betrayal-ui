import {
  Action,
  createAsyncThunk,
  createSlice,
  ThunkAction,
} from '@reduxjs/toolkit';
import { GridLoc } from '../components/board/grid';
import { Direction } from '../components/room/Room';
import { RootState } from '../rootReducer';
import { PlayerColor, Room } from './models';
import { Floor, StackRoom } from './models';

interface BoardState {
  rooms: Room[];
}

const getMatchingDoor: (dir: Direction) => Direction = (dir) => {
  switch (dir) {
    case Direction.NORTH:
      return Direction.SOUTH;
    case Direction.SOUTH:
      return Direction.NORTH;
    case Direction.EAST:
      return Direction.WEST;
    case Direction.WEST:
      return Direction.EAST;
  }
};

interface PlaceRoomPayload {
  loc: GridLoc;
}

export const placeRoom = createAsyncThunk<
  Room[],
  PlaceRoomPayload,
  { state: RootState }
>('board/placeRoomStatus', async ({ loc }, { getState }) => {
  const { name, doorDirections } = getState().roomStack.flippedRoom!!;
  const state = getState().board;
  return state.rooms.concat({
    name,
    doorDirections,
    loc,
    players: [],
  });
});

export const openSpotClicked: (
  loc: GridLoc,
  from: Direction[]
) => ThunkAction<void, RootState, unknown, Action<string>> = (loc, from) => (
  dispatch,
  getState
) => {
  const flippedRoom = getState().roomStack.flippedRoom;
  if (!flippedRoom) {
    return;
  }

  const hasMatchingDoor = flippedRoom.doorDirections
    .map(getMatchingDoor)
    .some((dir) => from.includes(dir));

  if (!hasMatchingDoor) {
    return;
  }

  dispatch(placeRoom({ loc }));
};

const initialState: BoardState = {
  rooms: [
    {
      name: 'Bloody Room',
      loc: { gridX: 2, gridY: 2 },
      doorDirections: [
        Direction.SOUTH,
        Direction.EAST,
        Direction.NORTH,
        Direction.WEST,
      ],
      players: [],
    },
    {
      name: 'Statuary Corridor',
      loc: { gridX: 1, gridY: 2 },
      doorDirections: [Direction.EAST, Direction.SOUTH],
      players: [{ color: PlayerColor.BLUE }],
    },
    {
      name: 'Master Bedroom',
      loc: { gridX: 2, gridY: 3 },
      doorDirections: [Direction.NORTH, Direction.SOUTH],
      players: [],
    },
    {
      name: 'Crypt',
      loc: { gridX: 2, gridY: 1 },
      doorDirections: [Direction.SOUTH],
      players: [
        { color: PlayerColor.YELLOW },
        { color: PlayerColor.RED },
        { color: PlayerColor.GREEN },
        { color: PlayerColor.WHITE },
        { color: PlayerColor.PURPLE },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeRoom.fulfilled, (state, { payload: rooms }) => {
      state.rooms = rooms;
    });
  },
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;

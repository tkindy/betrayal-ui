import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import { GridLoc } from '../components/board/grid';
import { Direction } from '../components/room/Room';
import { RootState } from '../rootReducer';
import * as api from '../api/api';
import { PlaceRoomResponse } from '../api/api';
import { Room } from './models';
import { Point } from '../components/geometry';
import { getOpenNeighbors } from './selectors';

export const getRooms = createAsyncThunk('board/getStatus', api.getRooms);

interface BoardState {
  topLeft: Point;
  rooms?: Room[];
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

export const placeRoom = createAsyncThunk<
  PlaceRoomResponse,
  GridLoc,
  { state: RootState }
>('board/placeRoomStatus', api.placeRoom);

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

  dispatch(placeRoom(loc));
};

export const flippedRoomDropped: (
  loc: GridLoc
) => ThunkAction<void, RootState, unknown, Action<string>> = (loc) => (
  dispatch,
  getState
) => {
  const openNeighbors = getOpenNeighbors(getState());
  const relevantNeighbor = openNeighbors?.find(
    (neighbor) =>
      neighbor.loc.gridX === loc.gridX && neighbor.loc.gridY === loc.gridY
  );

  if (!relevantNeighbor) {
    return;
  }

  dispatch(openSpotClicked(relevantNeighbor.loc, relevantNeighbor.from));
};

const initialState: BoardState = {
  topLeft: { x: 0, y: 0 },
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveBoard(state, action: PayloadAction<Point>) {
      state.topLeft = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.fulfilled, (state, { payload: rooms }) => {
        state.rooms = rooms;
      })
      .addCase(placeRoom.fulfilled, (state, { payload: { rooms } }) => {
        state.rooms = rooms;
      });
  },
});

export const { moveBoard } = boardSlice.actions;
export default boardSlice.reducer;

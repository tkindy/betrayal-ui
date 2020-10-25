import {
  Action,
  createAction,
  createSlice,
  ThunkAction,
} from '@reduxjs/toolkit';
import { GridLoc } from '../components/board/grid';
import { Direction } from '../components/room/Room';
import { RootState } from '../rootReducer';

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

export const placeRoom = createAction<PlaceRoomPayload>('board/placeRoom');

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

interface BoardState {}

const initialState: BoardState = {};

const boardSlice = createSlice({ name: 'board', initialState, reducers: {} });

export const {} = boardSlice.actions;
export default boardSlice.reducer;

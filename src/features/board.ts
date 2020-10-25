import {
  Action,
  createAction,
  createSlice,
  ThunkAction,
} from '@reduxjs/toolkit';
import { GridLoc } from '../components/board/grid';
import { Direction } from '../components/room/Room';
import { RootState } from '../rootReducer';

interface PlaceRoomPayload {
  loc: GridLoc;
}

export const placeRoom = createAction<PlaceRoomPayload>('board/placeRoom');

export const openSpotClicked: (
  loc: GridLoc,
  from: Direction[]
) => ThunkAction<void, RootState, unknown, Action<string>> = (loc) => (
  dispatch,
  getState
) => {
  const flippedRoom = getState().roomStack.flippedRoom;
  if (!flippedRoom) {
    return;
  }

  dispatch(placeRoom({ loc }));
};

interface BoardState {}

const initialState: BoardState = {};

const boardSlice = createSlice({ name: 'board', initialState, reducers: {} });

export const {} = boardSlice.actions;
export default boardSlice.reducer;

import { createSelector } from '@reduxjs/toolkit';
import { buildBoardMap, findOpenNeighbors } from '../board';
import { RootState } from '../rootReducer';

export const getRooms = (state: RootState) => state.board.rooms;

export const getOpenNeighbors = createSelector([getRooms], (rooms) => {
  if (!rooms) {
    return;
  }

  const map = buildBoardMap(rooms);
  return findOpenNeighbors(map);
});

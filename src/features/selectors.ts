import { createSelector } from '@reduxjs/toolkit';
import { buildBoardMap, findOpenNeighbors } from '../board';
import { RootState } from '../rootReducer';

export const getRooms = (state: RootState) => state.board.rooms;

export const getBoardMap = createSelector([getRooms], (rooms) => {
  if (!rooms) {
    return;
  }

  return buildBoardMap(rooms);
});

export const getOpenNeighbors = createSelector([getBoardMap], (map) => {
  if (!map) {
    return;
  }

  return findOpenNeighbors(map);
});

import { createSelector } from '@reduxjs/toolkit';
import { buildBoardMap, findOpenNeighbors } from '../board';
import { buildMultiCartMap } from '../map';
import { RootState } from '../store';

export const getGameCode = (state: RootState) => {
  const { gameCode } = state.game;

  if (!gameCode) {
    throw new Error('Not in a game!');
  }

  return gameCode;
};

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

export const getPlayers = (state: RootState) => state.players.players;

export const getPlayerMap = createSelector([getPlayers], (players) => {
  if (!players) {
    return;
  }

  return buildMultiCartMap(players, ({ loc: { gridX: x, gridY: y } }) => {
    return { x, y };
  });
});

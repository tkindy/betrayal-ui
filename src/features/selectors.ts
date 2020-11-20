import { createSelector } from '@reduxjs/toolkit';
import { buildBoardMap, findOpenNeighbors } from '../board';
import { buildMultiCartMap } from '../map';
import { RootState } from '../store';

export const getGameId = (state: RootState) => {
  const { gameId } = state.game;

  if (!gameId) {
    throw new Error('Not in a game!');
  }

  return gameId;
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

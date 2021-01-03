import { createSelector } from '@reduxjs/toolkit';
import { buildBoardMap, findOpenNeighbors } from '../board';
import { buildMultiCartMap, CartMap } from '../map';
import { RootState } from '../store';
import { sortBy } from '../utils';
import { Agent, Monster, Player } from './models';

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

const getPlayersRaw = (state: RootState) => state.players.players;

export const getPlayers = createSelector(
  getPlayersRaw,
  (players) => players && sortBy(players, (p) => p.characterName.toLowerCase())
);

const getMonstersRaw = (state: RootState) => state.monsters.monsters;

export const getMonsters = createSelector(
  getMonstersRaw,
  (monsters) => monsters && sortBy(monsters, (m) => m.number)
);

export const getAgentMap = createSelector<
  RootState,
  Player[] | undefined,
  Monster[] | undefined,
  CartMap<Agent[]>
>(getPlayers, getMonsters, (players, monsters) => {
  const playerAgents: Agent[] =
    players?.map((p) => {
      return {
        type: 'player',
        ...p,
      };
    }) || [];
  const monsterAgents: Agent[] =
    monsters?.map((m) => {
      return { type: 'monster', ...m };
    }) || [];

  return buildMultiCartMap(
    playerAgents.concat(monsterAgents),
    ({ loc: { gridX: x, gridY: y } }) => {
      return { x, y };
    }
  );
});

export const getSelectedPlayerId = (state: RootState) =>
  state.players.selectedPlayerId;

export const getSelectedPlayer = createSelector(
  [getPlayers, getSelectedPlayerId],
  (players, selectedPlayerId) => {
    if (!players || !selectedPlayerId) {
      return;
    }

    return players.find((player) => player.id === selectedPlayerId);
  }
);

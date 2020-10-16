import React, { FunctionComponent } from 'react';
import { Circle, Group } from 'react-konva';
import { partition } from '../utils';
import { add, Point, translate } from './geometry';
import { GridLoc, gridSize, gridToTopLeft } from './grid';

const playerRadius = 10;
const playersTopLeft: Point = {
  x: 0,
  y: gridSize / 3,
};
const playersWidth = gridSize;
const playersHeight = gridSize / 3;

export enum PlayerColor {
  WHITE = 'white',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  RED = 'red',
  PURPLE = 'purple',
}

export interface PlayerModel {
  color: PlayerColor;
}

export interface PlayerProps extends PlayerModel {}

const Player: FunctionComponent<PlayerProps> = ({ color }) => {
  return <Circle fill={color} radius={playerRadius} />;
};

interface PlayersRowProps {
  players: PlayerModel[];
  topLeft: Point;
  width: number;
  height: number;
}

const PlayersRow: FunctionComponent<PlayersRowProps> = ({
  players,
  topLeft,
  width,
  height,
}) => {
  // TODO:
  return null;
};

export interface PlayersProps {
  players: PlayerModel[];
  roomLoc: GridLoc;
}

const Players: FunctionComponent<PlayersProps> = ({ players, roomLoc }) => {
  const byRow = partition(players, 3);
  const rowHeight = playersHeight / byRow.length;
  const roomTopLeft = gridToTopLeft(roomLoc);

  return (
    <Group>
      {byRow.map((row, i) => (
        <PlayersRow
          players={row}
          topLeft={translate(
            add(roomTopLeft, playersTopLeft),
            0,
            i * rowHeight
          )}
          width={playersWidth}
          height={rowHeight}
        />
      ))}
    </Group>
  );
};

export default Players;

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

export interface PlayerProps extends PlayerModel {
  center: Point;
}

const Player: FunctionComponent<PlayerProps> = ({
  center: { x, y },
  color,
}) => {
  return (
    <Circle x={x} y={y} radius={playerRadius} fill={color} stroke="white" />
  );
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
  const segmentOffset = width / (players.length + 1);
  const middleLeft: Point = translate(topLeft, 0, height / 2);

  return (
    <Group>
      {players.map((player, i) => (
        <Player
          center={translate(middleLeft, (i + 1) * segmentOffset, 0)}
          {...player}
        />
      ))}
    </Group>
  );
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

import React, { FunctionComponent } from 'react';
import { Circle } from 'react-konva';
import { Point } from './geometry';
import { GridLoc, gridSize } from './grid';

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

export interface PlayersProps {
  players: PlayerModel[];
  roomLoc: GridLoc;
}

const Players: FunctionComponent<PlayersProps> = () => {
  return null;
};

export default Players;

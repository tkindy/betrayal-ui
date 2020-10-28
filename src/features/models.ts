import { GridLoc } from '../components/board/grid';
import { Direction } from '../components/room/Room';

export enum PlayerColor {
  WHITE = 'white',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  RED = 'red',
  PURPLE = 'purple',
}

export interface Player {
  color: PlayerColor;
  loc: GridLoc;
}

export interface Room {
  name: string;
  loc: GridLoc;
  doorDirections: Direction[];
}

export enum Floor {
  BASEMENT,
  GROUND,
  UPPER,
  ROOF,
}

export interface StackRoom {
  possibleFloors: Floor[];
}

export interface FlippedRoom {
  name: string;
  doorDirections: Direction[];
}

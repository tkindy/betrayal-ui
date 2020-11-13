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
  name: string;
  color: PlayerColor;
  loc: GridLoc;
  speed: number;
  might: number;
  sanity: number;
  knowledge: number;
}

export enum Feature {
  EVENT = 'EVENT',
  ITEM = 'ITEM',
  OMEN = 'OMEN',
  DUMBWAITER = 'DUMBWAITER',
}

interface RoomCore {
  name: string;
  doorDirections: Direction[];
  features: Feature[];
}

export interface Room extends RoomCore {
  loc: GridLoc;
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

export interface FlippedRoom extends RoomCore {}

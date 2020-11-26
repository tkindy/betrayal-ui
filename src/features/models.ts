import { GridLoc } from '../components/game/board/grid';
import { Direction } from '../components/game/room/Room';

export enum PlayerColor {
  WHITE = 'white',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  RED = 'red',
  PURPLE = 'purple',
}

export interface Trait {
  value: number;
  index: number;
}

export interface Player {
  id: number;
  characterName: string;
  color: PlayerColor;
  loc: GridLoc;
  speed: Trait;
  might: Trait;
  sanity: Trait;
  knowledge: Trait;
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

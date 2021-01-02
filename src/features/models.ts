import { GridLoc } from '../components/game/board/grid';
import { Direction } from '../components/game/room/Room';
import { RoomStackState } from './roomStack';

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
  cards: HeldCard[];
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
  BASEMENT = 'BASEMENT',
  GROUND = 'GROUND',
  UPPER = 'UPPER',
  ROOF = 'ROOF',
}

export interface StackRoom {
  possibleFloors: Floor[];
}

export interface FlippedRoom extends RoomCore {}

export interface ExactRollTarget {
  type: 'EXACT';
  target: number;
}

export interface RangeRollTarget {
  type: 'RANGE';
  start: number;
  end: number;
}

export interface MinRollTarget {
  type: 'MIN';
  minimum: number;
}

export type RollTarget = ExactRollTarget | RangeRollTarget | MinRollTarget;

export interface RollTableRow {
  target: RollTarget;
  outcome: string;
}

export type RollTable = RollTableRow[];

export interface EventCard {
  type: 'EVENT';
  name: string;
  condition?: string;
  flavorText?: string;
  description: string;
  rollTable?: RollTable;
}

export interface ItemCard {
  type: 'ITEM';
  name: string;
  subtype?: string;
  flavorText?: string;
  description: string;
  rollTable?: RollTable;
}

export interface OmenCard {
  type: 'OMEN';
  name: string;
  subtype?: string;
  flavorText?: string;
  description: string;
  rollTable?: RollTable;
}

export type Card = EventCard | ItemCard | OmenCard;

export interface HeldCard {
  id: number;
  card: Card;
}

export interface GameUpdate {
  rooms: Room[];
  players: Player[];
  roomStack: RoomStackState;
  drawnCard: Card | null;
  latestRoll: number[] | null;
}

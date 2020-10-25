import { GridLoc } from '../components/board/grid';
import { Direction } from '../components/room/Room';
import {
  FlippedRoom,
  Floor,
  PlayerColor,
  Room,
  StackRoom,
} from '../features/models';

const mockStack: { stackRoom: StackRoom; flipped: FlippedRoom }[] = [
  {
    stackRoom: { possibleFloors: [Floor.BASEMENT, Floor.GROUND] },
    flipped: {
      name: 'Graveyard',
      doorDirections: [Direction.NORTH, Direction.EAST],
    },
  },
  {
    stackRoom: { possibleFloors: [Floor.GROUND] },
    flipped: { name: 'Entrance Hall', doorDirections: [Direction.NORTH] },
  },
  {
    stackRoom: {
      possibleFloors: [Floor.BASEMENT, Floor.GROUND, Floor.UPPER, Floor.ROOF],
    },
    flipped: { name: 'Mystic Elevator', doorDirections: [Direction.SOUTH] },
  },
];

let mockStackIndex = 0;

let flippedRoom: FlippedRoom | undefined = undefined;

export const flipRoom = async () => {
  const { flipped } = mockStack[mockStackIndex];
  flippedRoom = flipped;
  delete mockStack[mockStackIndex];
  return flipped;
};

const rotateDirection = (dir: Direction) => {
  switch (dir) {
    case Direction.NORTH:
      return Direction.EAST;
    case Direction.EAST:
      return Direction.SOUTH;
    case Direction.SOUTH:
      return Direction.WEST;
    case Direction.WEST:
      return Direction.NORTH;
  }
};

export const rotateFlipped = async () => {
  if (!flippedRoom) {
    throw new Error("can't rotate since there's no flipped room");
  }

  const { name, doorDirections } = flippedRoom;
  flippedRoom = {
    name,
    doorDirections: doorDirections.map(rotateDirection),
  };

  return flippedRoom;
};

let rooms: Room[] = [
  {
    name: 'Bloody Room',
    loc: { gridX: 2, gridY: 2 },
    doorDirections: [
      Direction.SOUTH,
      Direction.EAST,
      Direction.NORTH,
      Direction.WEST,
    ],
    players: [],
  },
  {
    name: 'Statuary Corridor',
    loc: { gridX: 1, gridY: 2 },
    doorDirections: [Direction.EAST, Direction.SOUTH],
    players: [{ color: PlayerColor.BLUE }],
  },
  {
    name: 'Master Bedroom',
    loc: { gridX: 2, gridY: 3 },
    doorDirections: [Direction.NORTH, Direction.SOUTH],
    players: [],
  },
  {
    name: 'Crypt',
    loc: { gridX: 2, gridY: 1 },
    doorDirections: [Direction.SOUTH],
    players: [
      { color: PlayerColor.YELLOW },
      { color: PlayerColor.RED },
      { color: PlayerColor.GREEN },
      { color: PlayerColor.WHITE },
      { color: PlayerColor.PURPLE },
    ],
  },
];

export interface PlaceRoomResponse {
  rooms: Room[];
  nextRoom?: StackRoom;
}

export const placeRoom = async (loc: GridLoc) => {
  if (!flippedRoom) {
    throw new Error("can't place room since there isn't one flipped");
  }

  const { name, doorDirections } = flippedRoom;
  rooms = rooms.concat({
    name,
    doorDirections,
    loc,
    players: [],
  });
  mockStackIndex =
    mockStackIndex >= mockStack.length - 1 ? 0 : mockStackIndex + 1;

  return {
    rooms,
    nextRoom: mockStack[mockStackIndex].stackRoom,
  } as PlaceRoomResponse;
};

export const getStackRoom = async () => {
  return mockStack[mockStackIndex].stackRoom;
};

export const getRooms = async () => {
  return rooms;
};

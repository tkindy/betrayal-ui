import { equal, GridLoc } from '../components/board/grid';
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

const fixStackIndex = () => {
  if (mockStackIndex >= mockStack.length) {
    mockStackIndex = 0;
  }
};

const advanceStack = () => {
  if (mockStack.every((x) => x === undefined)) {
    return;
  }

  do {
    mockStackIndex += 1;
    fixStackIndex();
  } while (mockStack[mockStackIndex] === undefined);
};

export const getStackRoom = async () => {
  return mockStack[mockStackIndex]
    ? mockStack[mockStackIndex].stackRoom
    : undefined;
};

export const skipRoom = async () => {
  advanceStack();
  return getStackRoom();
};

let flippedRoom: FlippedRoom | undefined = undefined;

export const flipRoom = async () => {
  const { flipped } = mockStack[mockStackIndex];
  flippedRoom = flipped;
  delete mockStack[mockStackIndex];
  advanceStack();
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

interface PlayerModel {
  loc: GridLoc;
  color: PlayerColor;
}

let players: PlayerModel[] = [
  { loc: { gridX: 2, gridY: 1 }, color: PlayerColor.YELLOW },
  { loc: { gridX: 2, gridY: 1 }, color: PlayerColor.RED },
  { loc: { gridX: 2, gridY: 1 }, color: PlayerColor.GREEN },
  { loc: { gridX: 2, gridY: 1 }, color: PlayerColor.WHITE },
  { loc: { gridX: 2, gridY: 1 }, color: PlayerColor.PURPLE },
  { loc: { gridX: 1, gridY: 2 }, color: PlayerColor.BLUE },
];

type RoomWithoutPlayers = Omit<Room, 'players'>;

let rooms: RoomWithoutPlayers[] = [
  {
    name: 'Bloody Room',
    loc: { gridX: 2, gridY: 2 },
    doorDirections: [
      Direction.SOUTH,
      Direction.EAST,
      Direction.NORTH,
      Direction.WEST,
    ],
  },
  {
    name: 'Statuary Corridor',
    loc: { gridX: 1, gridY: 2 },
    doorDirections: [Direction.EAST, Direction.SOUTH],
  },
  {
    name: 'Master Bedroom',
    loc: { gridX: 2, gridY: 3 },
    doorDirections: [Direction.NORTH, Direction.SOUTH],
  },
  {
    name: 'Crypt',
    loc: { gridX: 2, gridY: 1 },
    doorDirections: [Direction.SOUTH],
  },
];

export interface PlaceRoomResponse {
  rooms: Room[];
  nextRoom?: StackRoom;
}
export const placeRoom: (loc: GridLoc) => Promise<PlaceRoomResponse> = async (
  loc
) => {
  if (!flippedRoom) {
    throw new Error("can't place room since there isn't one flipped");
  }

  const { name, doorDirections } = flippedRoom;
  rooms = rooms.concat({
    name,
    doorDirections,
    loc,
  });

  return {
    rooms: await getRooms(),
    nextRoom: await getStackRoom(),
  };
};

export const getRooms: () => Promise<Room[]> = async () => {
  return rooms.map((room) => {
    return {
      ...room,
      players: players.filter((player) => equal(player.loc, room.loc)),
    };
  });
};

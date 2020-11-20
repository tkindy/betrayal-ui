import { GridLoc } from '../components/game/board/grid';
import { Direction } from '../components/game/room/Room';
import {
  Feature,
  FlippedRoom,
  Floor,
  Player,
  PlayerColor,
  Room,
  StackRoom,
} from '../features/models';
import { choices } from '../utils';

export const createGame = async () => {
  return choices(
    Array.from(
      Array('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1).keys()
    ).map((i) => String.fromCharCode(i + 'A'.charCodeAt(0))),
    4
  ).join('');
};

export const joinGame = async (gameCode: string) => {
  return gameCode;
};

const mockStack: { stackRoom: StackRoom; flipped: FlippedRoom }[] = [
  {
    stackRoom: { possibleFloors: [Floor.BASEMENT, Floor.GROUND] },
    flipped: {
      name: 'Graveyard',
      doorDirections: [Direction.NORTH, Direction.EAST],
      features: [Feature.EVENT],
    },
  },
  {
    stackRoom: { possibleFloors: [Floor.GROUND] },
    flipped: {
      name: 'Entrance Hall',
      doorDirections: [Direction.NORTH],
      features: [Feature.OMEN, Feature.DUMBWAITER],
    },
  },
  {
    stackRoom: {
      possibleFloors: [Floor.BASEMENT, Floor.GROUND, Floor.UPPER, Floor.ROOF],
    },
    flipped: {
      name: 'Mystic Elevator',
      doorDirections: [Direction.SOUTH],
      features: [Feature.ITEM, Feature.ITEM],
    },
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

  const { name, doorDirections, features } = flippedRoom;
  flippedRoom = {
    name,
    doorDirections: doorDirections.map(rotateDirection),
    features,
  };

  return flippedRoom;
};

let players: Player[] = [
  {
    name: 'Missy Dubourde',
    loc: { gridX: 2, gridY: 1 },
    color: PlayerColor.YELLOW,
    speed: 3,
    might: 3,
    sanity: 6,
    knowledge: 4,
  },
  {
    name: 'Darrin "Flash" Williams',
    loc: { gridX: 2, gridY: 1 },
    color: PlayerColor.RED,
    speed: 7,
    might: 4,
    sanity: 3,
    knowledge: 2,
  },
  {
    name: 'Peter Akimoto',
    loc: { gridX: 2, gridY: 1 },
    color: PlayerColor.GREEN,
    speed: 5,
    might: 2,
    sanity: 4,
    knowledge: 6,
  },
  {
    name: 'Father Rhinehardt',
    loc: { gridX: 2, gridY: 1 },
    color: PlayerColor.WHITE,
    speed: 2,
    might: 3,
    sanity: 6,
    knowledge: 6,
  },
  {
    name: 'Jenny LeClerc',
    loc: { gridX: 2, gridY: 1 },
    color: PlayerColor.PURPLE,
    speed: 4,
    might: 3,
    sanity: 3,
    knowledge: 6,
  },
  {
    name: 'Madame Zostra',
    loc: { gridX: 1, gridY: 2 },
    color: PlayerColor.BLUE,
    speed: 4,
    might: 3,
    sanity: 6,
    knowledge: 1,
  },
];

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
    features: [Feature.ITEM],
  },
  {
    name: 'Statuary Corridor',
    loc: { gridX: 1, gridY: 2 },
    doorDirections: [Direction.EAST, Direction.SOUTH],
    features: [Feature.EVENT, Feature.DUMBWAITER],
  },
  {
    name: 'Master Bedroom',
    loc: { gridX: 2, gridY: 3 },
    doorDirections: [Direction.NORTH, Direction.SOUTH],
    features: [Feature.OMEN],
  },
  {
    name: 'Crypt',
    loc: { gridX: 2, gridY: 1 },
    doorDirections: [Direction.SOUTH],
    features: [Feature.DUMBWAITER],
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

  rooms = rooms.concat({
    ...flippedRoom,
    loc,
  });

  return {
    rooms: await getRooms(),
    nextRoom: await getStackRoom(),
  };
};

export const getRooms: () => Promise<Room[]> = async () => {
  return rooms;
};

export const getPlayers: () => Promise<Player[]> = async () => {
  return players;
};

export const movePlayer: (
  color: PlayerColor,
  loc: GridLoc
) => Promise<Player[]> = async (color, loc) => {
  const player = players.find((player) => player.color === color);

  if (!player) {
    throw new Error("can't move player that isn't in the game");
  }

  players = players
    .filter((player) => player.color !== color)
    .concat({ ...player, loc });
  return getPlayers();
};

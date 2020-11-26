import { GridLoc } from '../components/game/board/grid';
import { Direction } from '../components/game/room/Room';
import {
  Feature,
  FlippedRoom,
  Floor,
  Player,
  Room,
  StackRoom,
} from '../features/models';
import axios from 'axios';

const buildApiUrl = (path: string) => process.env.REACT_APP_API_ROOT + path;

export const createGame: () => Promise<string> = async () => {
  const response = await axios.post<{ id: string }>(buildApiUrl('/games'), {
    name: 'Foo',
    numPlayers: 6,
  });
  return response.data.id;
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

const fixStackIndex = (gameId: string) => {
  if (mockStackIndex >= mockStack.length) {
    mockStackIndex = 0;
  }
};

const advanceStack = (gameId: string) => {
  if (mockStack.every((x) => x === undefined)) {
    return;
  }

  do {
    mockStackIndex += 1;
    fixStackIndex(gameId);
  } while (mockStack[mockStackIndex] === undefined);
};

export const getStackRoom = async (gameId: string) => {
  return mockStack[mockStackIndex]
    ? mockStack[mockStackIndex].stackRoom
    : undefined;
};

export const skipRoom = async (gameId: string) => {
  advanceStack(gameId);
  return getStackRoom(gameId);
};

let flippedRoom: FlippedRoom | undefined = undefined;

export const flipRoom = async (gameId: string) => {
  const { flipped } = mockStack[mockStackIndex];
  flippedRoom = flipped;
  delete mockStack[mockStackIndex];
  advanceStack(gameId);
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

export const rotateFlipped = async (gameId: string) => {
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
export const placeRoom: (
  gameId: string,
  loc: GridLoc
) => Promise<PlaceRoomResponse> = async (gameId, loc) => {
  if (!flippedRoom) {
    throw new Error("can't place room since there isn't one flipped");
  }

  rooms = rooms.concat({
    ...flippedRoom,
    loc,
  });

  return {
    rooms: await getRooms(gameId),
    nextRoom: await getStackRoom(gameId),
  };
};

export const getRooms: (gameId: string) => Promise<Room[]> = async (gameId) => {
  const response = await axios.get<Room[]>(
    buildApiUrl(`/games/${gameId}/rooms`)
  );
  return response.data;
};

export const getPlayers: (gameId: string) => Promise<Player[]> = async (
  gameId
) => {
  const response = await axios.get<Player[]>(
    buildApiUrl(`/games/${gameId}/players`)
  );
  return response.data;
};

export const movePlayer: (
  gameId: string,
  playerId: number,
  loc: GridLoc
) => Promise<Player[]> = async (gameId, playerId, loc) => {
  await axios.post(
    buildApiUrl(`/games/${gameId}/players/${playerId}/move`),
    loc
  );
  return getPlayers(gameId);
};

import { GridLoc } from '../components/game/board/grid';
import { Direction } from '../components/game/room/Room';
import {
  Feature,
  FlippedRoom,
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

interface RoomStackResponse {
  nextRoom?: StackRoom;
  flippedRoom?: FlippedRoom;
}

export const getRoomStack = async (gameId: string) => {
  const response = await axios.get<RoomStackResponse>(
    buildApiUrl(`/games/${gameId}/roomStack`)
  );

  return response.data;
};

export const skipRoom = async (gameId: string) => {
  const response = await axios.post<RoomStackResponse>(
    buildApiUrl(`/games/${gameId}/roomStack/skip`)
  );

  return response.data.nextRoom;
};

let flippedRoom: FlippedRoom | undefined = undefined;

export const flipRoom = async (gameId: string) => {
  const response = await axios.post<RoomStackResponse>(
    buildApiUrl(`/games/${gameId}/roomStack/flip`)
  );

  return response.data.flippedRoom;
};

export const rotateFlipped = async (gameId: string) => {
  const response = await axios.post<RoomStackResponse>(
    buildApiUrl(`/games/${gameId}/roomStack/rotate`)
  );
  return response.data.flippedRoom;
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
    nextRoom: (await getRoomStack(gameId)).nextRoom,
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

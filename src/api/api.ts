import { GridLoc } from '../components/game/board/grid';
import {
  Card,
  EventCard,
  FlippedRoom,
  ItemCard,
  OmenCard,
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

export interface PlaceRoomResponse {
  rooms: Room[];
  nextRoom?: StackRoom;
}
export const placeRoom: (
  gameId: string,
  loc: GridLoc
) => Promise<PlaceRoomResponse> = async (gameId, loc) => {
  const response = await axios.post<PlaceRoomResponse>(
    buildApiUrl(`/games/${gameId}/roomStack/place`),
    loc
  );
  return response.data;
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

export const getDrawnCard: (gameId: string) => Promise<Card | null> = async (
  gameId
) => {
  const response = await axios.get<Card>(
    buildApiUrl(`/games/${gameId}/cards/drawn`)
  );

  if (response.status === 404) {
    return null;
  }

  return response.data;
};

export const drawEvent: (gameId: string) => Promise<EventCard> = async (
  gameId
) => {
  const response = await axios.post<EventCard>(
    buildApiUrl(`/games/${gameId}/cards/events/draw`)
  );
  return response.data;
};

export const drawItem: (gameId: string) => Promise<ItemCard> = async (
  gameId
) => {
  const response = await axios.post<ItemCard>(
    buildApiUrl(`/games/${gameId}/cards/items/draw`)
  );
  return response.data;
};

export const drawOmen: (gameId: string) => Promise<OmenCard> = async (
  gameId
) => {
  const response = await axios.post<OmenCard>(
    buildApiUrl(`/games/${gameId}/cards/omens/draw`)
  );
  return response.data;
};

import React, { FunctionComponent } from 'react';
import BoardRoom, { BoardRoomProps } from './BoardRoom';
import { Group } from 'react-konva';
import { GridLoc } from './grid';

interface BoardProps {
  rooms: BoardRoomProps[];
}

type BoardMap = Record<number, Record<number, BoardRoomProps>>;

const buildBoardMap: (rooms: BoardRoomProps[]) => BoardMap = (rooms) => {
  const map = {} as BoardMap;

  for (const room of rooms) {
    const { gridX: x, gridY: y } = room.loc;
    if (!(x in map)) {
      map[x] = {};
    }

    map[x][y] = room;
  }

  return map;
};

const getNeighboringLocs: (room: BoardRoomProps) => GridLoc[] = (room) => {
  const { gridX: x, gridY: y } = room.loc;

  return [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ].map(([dx, dy]) => {
    return {
      gridX: x + dx,
      gridY: y + dy,
    };
  });
};

const isOpen: (loc: GridLoc, map: BoardMap) => boolean = (loc, map) => {
  const { gridX: x, gridY: y } = loc;
  return !(map[x] && map[x][y]);
};

const findOpenLocs: (map: BoardMap) => GridLoc[] = (map) => {
  return Object.values(map)
    .flatMap(Object.values)
    .flatMap(getNeighboringLocs)
    .filter((loc) => isOpen(loc, map));
};

const Board: FunctionComponent<BoardProps> = ({ rooms }) => {
  return (
    <Group>
      {rooms.map((room) => (
        <BoardRoom key={room.name} {...room} />
      ))}
    </Group>
  );
};

export default Board;

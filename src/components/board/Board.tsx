import React, { FunctionComponent } from 'react';
import BoardRoom, { BoardRoomProps } from './BoardRoom';
import { Group } from 'react-konva';
import { GridLoc } from './grid';
import OpenSpot from './OpenSpot';
import { unique } from '../../utils';
import { Direction } from '../room/Room';

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

const getDelta: (dir: Direction) => [number, number] = (dir) => {
  switch (dir) {
    case Direction.NORTH:
      return [0, -1];
    case Direction.SOUTH:
      return [0, 1];
    case Direction.EAST:
      return [1, 0];
    case Direction.WEST:
      return [-1, 0];
  }
};

const getNeighboringLocs: (room: BoardRoomProps) => GridLoc[] = (room) => {
  const { gridX: x, gridY: y } = room.loc;

  return room.doorDirections.map(getDelta).map(([dx, dy]) => {
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
  const neighboringLocs = unique(
    Object.values(map).flatMap(Object.values).flatMap(getNeighboringLocs)
  );

  return neighboringLocs.filter((loc) => isOpen(loc, map));
};

const Board: FunctionComponent<BoardProps> = ({ rooms }) => {
  const map = buildBoardMap(rooms);
  const openLocs = findOpenLocs(map);
  console.log(openLocs);

  return (
    <Group>
      {rooms.map((room) => (
        <BoardRoom key={room.name} {...room} />
      ))}
      {openLocs.map((openLoc) => {
        const { gridX, gridY } = openLoc;
        return <OpenSpot key={`(${gridX}, ${gridY})`} loc={openLoc} />;
      })}
    </Group>
  );
};

export default Board;

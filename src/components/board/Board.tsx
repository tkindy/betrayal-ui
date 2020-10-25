import React, { FunctionComponent } from 'react';
import BoardRoom from './BoardRoom';
import { Group } from 'react-konva';
import { GridLoc } from './grid';
import OpenSpot from './OpenSpot';
import { index } from '../../utils';
import { Direction } from '../room/Room';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { Room as RoomModel } from '../../features/board';

interface BoardProps {}

type BoardMap = Record<number, Record<number, RoomModel>>;

const buildBoardMap: (rooms: RoomModel[]) => BoardMap = (rooms) => {
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

interface Neighbor {
  loc: GridLoc;
  from: Direction[];
}

const getNeighbors: (room: RoomModel) => Neighbor[] = (room) => {
  const { gridX: x, gridY: y } = room.loc;

  return room.doorDirections.map((dir) => {
    const [dx, dy] = getDelta(dir);

    return {
      loc: {
        gridX: x + dx,
        gridY: y + dy,
      },
      from: [dir],
    };
  });
};

const isOpen: (loc: GridLoc, map: BoardMap) => boolean = (loc, map) => {
  const { gridX: x, gridY: y } = loc;
  return !(map[x] && map[x][y]);
};

const findOpenNeighbors: (map: BoardMap) => Neighbor[] = (map) => {
  const openNeighbors = Object.values(map)
    .flatMap(Object.values)
    .flatMap(getNeighbors)
    .filter(({ loc }) => isOpen(loc, map));

  const locIndex = index(openNeighbors, (neighbor) => neighbor.loc);

  return Array.from(locIndex.values()).map((neighbors) =>
    neighbors.reduce(({ loc, from }, cur) => {
      return { loc, from: from.concat(cur.from) };
    })
  );
};

const Board: FunctionComponent<BoardProps> = () => {
  const rooms = useSelector((state: RootState) => state.board.rooms);
  const map = buildBoardMap(rooms);
  const openNeighbors = findOpenNeighbors(map);

  return (
    <Group>
      {rooms.map((room) => (
        <BoardRoom key={room.name} {...room} />
      ))}
      {openNeighbors.map(({ loc, from }) => {
        const { gridX, gridY } = loc;
        return <OpenSpot key={`(${gridX}, ${gridY})`} loc={loc} from={from} />;
      })}
    </Group>
  );
};

export default Board;

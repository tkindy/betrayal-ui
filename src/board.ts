import { GridLoc } from './components/board/grid';
import { Direction } from './components/room/Room';
import { Room as RoomModel } from './features/models';
import { index } from './utils';

type BoardMap = Record<number, Record<number, RoomModel>>;

export const buildBoardMap: (rooms: RoomModel[]) => BoardMap = (rooms) => {
  const map: BoardMap = {};

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

export const findOpenNeighbors: (map: BoardMap) => Neighbor[] = (map) => {
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

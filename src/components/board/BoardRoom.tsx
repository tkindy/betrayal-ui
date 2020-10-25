import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import Room, { Direction } from '../room/Room';
import RoomName from '../room/RoomName';
import { GridLoc, useGridSize, useGridTopLeft } from './grid';
import Players, { PlayerModel } from './Players';

export interface BoardRoomProps {
  name: string;
  loc: GridLoc;
  doorDirections: Direction[];
  players: PlayerModel[];
}

const BoardRoom: FunctionComponent<BoardRoomProps> = ({
  name,
  loc,
  doorDirections,
  players,
}) => {
  const topLeft = useGridTopLeft(loc);
  const gridSize = useGridSize();

  return (
    <Group>
      <Room
        box={{ topLeft, dimensions: { width: gridSize, height: gridSize } }}
        doorDirections={doorDirections}
      />
      <RoomName
        box={{ topLeft, dimensions: { width: gridSize, height: gridSize / 2 } }}
        name={name}
      />
      <Players players={players} roomLoc={loc} />
    </Group>
  );
};

export default BoardRoom;

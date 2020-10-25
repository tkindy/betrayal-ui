import React, { FunctionComponent } from 'react';
import { Group, Text } from 'react-konva';
import Room, { Direction } from '../Room';
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
      <Text
        x={topLeft.x}
        y={topLeft.y}
        width={gridSize}
        height={gridSize / 2}
        text={name}
        fontSize={16}
        fill="red"
        align="center"
        verticalAlign="middle"
      />
      <Players players={players} roomLoc={loc} />
    </Group>
  );
};

export default BoardRoom;

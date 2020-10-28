import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import Room from '../room/Room';
import RoomName from '../room/RoomName';
import { useGridSize, useGridTopLeft } from './grid';
import { Room as RoomModel } from '../../features/models';

const BoardRoom: FunctionComponent<RoomModel> = ({
  name,
  loc,
  doorDirections,
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
    </Group>
  );
};

export default BoardRoom;

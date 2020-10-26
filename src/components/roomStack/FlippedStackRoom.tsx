import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { droppedInGrid, useGridSize } from '../board/grid';
import { BoundingBox } from '../layout';
import Room, { Direction } from '../room/Room';
import RoomName from '../room/RoomName';
import { getRoomBoundingBox } from './shared';

interface FlippedStackRoomProps {
  areaBox: BoundingBox;
  name: string;
  doorDirections: Direction[];
}

const FlippedStackRoom: FunctionComponent<FlippedStackRoomProps> = ({
  areaBox,
  name,
  doorDirections,
}) => {
  const roomBox = getRoomBoundingBox(areaBox);
  const dispatch = useDispatch();
  const gridSize = useGridSize();
  const boardTopLeft = useSelector((state: RootState) => state.board.topLeft);

  return (
    <Group
      draggable
      onDragEnd={(e) => {
        const droppedOn = droppedOnGrid(e, roomBox, gridSize, boardTopLeft);
        console.log(`dropped on (${droppedOn.gridX}, ${droppedOn.gridY})`);
      }}
    >
      <Room box={roomBox} doorDirections={doorDirections} />
      <RoomName box={roomBox} name={name} />
    </Group>
  );
};

export default FlippedStackRoom;

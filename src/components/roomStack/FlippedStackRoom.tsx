import React, { FunctionComponent, useState } from 'react';
import { Group } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { droppedOnGrid, useGridSize } from '../board/grid';
import { Point } from '../geometry';
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
  const [groupTopLeft, setGroupTopLeft] = useState<Point>({ x: 0, y: 0 });

  return (
    <Group
      draggable
      onDragEnd={(e) => {
        const droppedOn = droppedOnGrid(e, roomBox, gridSize, boardTopLeft);
        setGroupTopLeft({ x: e.target.x(), y: e.target.y() });
        setGroupTopLeft({ x: 0, y: 0 });
      }}
      x={groupTopLeft.x}
      y={groupTopLeft.y}
    >
      <Room box={roomBox} doorDirections={doorDirections} />
      <RoomName box={roomBox} name={name} />
    </Group>
  );
};

export default FlippedStackRoom;

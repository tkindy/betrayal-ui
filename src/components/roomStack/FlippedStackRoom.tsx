import React, { FunctionComponent, useState } from 'react';
import { Group } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { flippedRoomDropped } from '../../features/board';
import { RootState } from '../../rootReducer';
import { useGridSize, windowToGridLoc } from '../board/grid';
import { Point, translate } from '../geometry';
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
  const {
    topLeft: roomTopLeft,
    dimensions: { width: roomWidth, height: roomHeight },
  } = roomBox;
  const dispatch = useDispatch();
  const gridSize = useGridSize();
  const boardTopLeft = useSelector((state: RootState) => state.board.topLeft);
  const [groupTopLeft, setGroupTopLeft] = useState<Point>({ x: 0, y: 0 });

  return (
    <Group
      draggable
      onDragEnd={(e) => {
        const { x, y } = e.target.position();
        const pointDroppedOn = translate(
          roomTopLeft,
          x + roomWidth / 2,
          y + roomHeight / 2
        );
        const gridDroppedOn = windowToGridLoc(
          pointDroppedOn,
          gridSize,
          boardTopLeft
        );
        dispatch(flippedRoomDropped(gridDroppedOn));
        setGroupTopLeft({ x, y });
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

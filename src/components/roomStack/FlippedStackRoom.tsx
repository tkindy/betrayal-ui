import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { flippedRoomDropped } from '../../features/board';
import { Feature } from '../../features/models';
import { RootState } from '../../store';
import { useGridSize, windowToGridLoc } from '../board/grid';
import { translate } from '../geometry';
import { useRender } from '../hooks';
import { BoundingBox, getDoorDimensions } from '../layout';
import Room, { Direction } from '../room/Room';
import RoomFeatures from '../room/RoomFeatures';
import RoomName from '../room/RoomName';
import { getRoomBoundingBox } from './shared';

interface FlippedStackRoomProps {
  areaBox: BoundingBox;
  name: string;
  doorDirections: Direction[];
  features: Feature[];
}

const FlippedStackRoom: FunctionComponent<FlippedStackRoomProps> = ({
  areaBox,
  name,
  doorDirections,
  features,
}) => {
  const roomBox = getRoomBoundingBox(areaBox);
  const { height: doorHeight } = getDoorDimensions(roomBox.dimensions);
  const {
    topLeft: roomTopLeft,
    dimensions: { width: roomWidth, height: roomHeight },
  } = roomBox;
  const innerTopLeft = translate(roomTopLeft, doorHeight, doorHeight);
  const innerWidth = roomWidth - 2 * doorHeight;
  const innerHeight = roomHeight - 2 * doorHeight;
  const nameBox = {
    topLeft: translate(innerTopLeft, 0, innerHeight / 3),
    dimensions: { width: innerWidth, height: innerHeight / 6 },
  };
  const featuresBox = {
    topLeft: translate(innerTopLeft, 0, innerHeight / 2),
    dimensions: { width: innerWidth, height: innerHeight / 6 },
  };
  const dispatch = useDispatch();
  const gridSize = useGridSize();
  const boardTopLeft = useSelector((state: RootState) => state.board.topLeft);
  const render = useRender();

  return (
    <Group
      x={0}
      y={0}
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

        render();
      }}
    >
      <Room box={roomBox} doorDirections={doorDirections} />
      <RoomName box={nameBox} name={name} />
      <RoomFeatures box={featuresBox} features={features} />
    </Group>
  );
};

export default FlippedStackRoom;

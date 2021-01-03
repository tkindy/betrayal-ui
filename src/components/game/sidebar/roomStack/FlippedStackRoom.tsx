import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { flippedRoomDropped } from '../../../../features/board';
import { Feature, FlippedRoom } from '../../../../features/models';
import { RootState } from '../../../../store';
import { translate } from '../../../geometry';
import { useRender } from '../../../hooks';
import { BoundingBox, getDoorDimensions } from '../../../layout';
import { useGridSize, windowToGridLoc } from '../../board/grid';
import Room, { Direction } from '../../room/Room';
import RoomFeatures from '../../room/RoomFeatures';
import RoomName from '../../room/RoomName';

interface FlippedStackRoomProps {
  box: BoundingBox;
  flippedRoom: FlippedRoom;
}

const FlippedStackRoom: FunctionComponent<FlippedStackRoomProps> = ({
  box,
  flippedRoom: { name, doorDirections, features, barrier },
}) => {
  const { height: doorHeight } = getDoorDimensions(box.dimensions);
  const {
    topLeft: roomTopLeft,
    dimensions: { width: roomWidth, height: roomHeight },
  } = box;
  const innerTopLeft = translate(roomTopLeft, doorHeight, doorHeight);
  const innerWidth = roomWidth - 2 * doorHeight;
  const innerHeight = roomHeight - 2 * doorHeight;
  const nameBox = {
    topLeft: translate(innerTopLeft, 0, innerHeight / 6),
    dimensions: { width: innerWidth, height: innerHeight / 3 },
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
      <Room box={box} doorDirections={doorDirections} />
      <RoomName box={nameBox} name={name} />
      <RoomFeatures
        box={featuresBox}
        features={features.concat(barrier?.features || [])}
      />
    </Group>
  );
};

export default FlippedStackRoom;

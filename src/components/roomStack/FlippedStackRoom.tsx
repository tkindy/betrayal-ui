import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
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
  return (
    <Group>
      <Room box={roomBox} doorDirections={doorDirections} />
      <RoomName box={roomBox} name={name} />
    </Group>
  );
};

export default FlippedStackRoom;

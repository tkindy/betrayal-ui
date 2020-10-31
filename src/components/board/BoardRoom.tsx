import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import Room from '../room/Room';
import RoomName from '../room/RoomName';
import { useGridBox } from './grid';
import { Room as RoomModel } from '../../features/models';
import { BoundingBox } from '../layout';

const BoardRoom: FunctionComponent<RoomModel> = ({
  name,
  loc,
  doorDirections,
}) => {
  const box = useGridBox(loc);
  const {
    topLeft,
    dimensions: { width, height },
  } = box;
  const nameBox: BoundingBox = {
    topLeft,
    dimensions: { width, height: height / 2 },
  };

  return (
    <Group>
      <Room box={box} doorDirections={doorDirections} />
      <RoomName box={nameBox} name={name} />
    </Group>
  );
};

export default BoardRoom;

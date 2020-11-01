import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import Room from '../room/Room';
import RoomName from '../room/RoomName';
import { useGridBox } from './grid';
import { Room as RoomModel } from '../../features/models';
import { getRoomDetailsBox } from '../layout';
import RoomFeatures from '../room/RoomFeatures';
import { translate } from '../geometry';

const BoardRoom: FunctionComponent<RoomModel> = ({
  name,
  loc,
  doorDirections,
  features,
}) => {
  const box = useGridBox(loc);
  const detailsBox = getRoomDetailsBox(box);
  const {
    topLeft: detailsTopLeft,
    dimensions: { width: detailsWidth, height: detailsHeight },
  } = detailsBox;
  const nameBox = {
    topLeft: detailsTopLeft,
    dimensions: { width: detailsWidth, height: detailsHeight / 2 },
  };
  const featuresBox = {
    topLeft: translate(detailsTopLeft, 0, detailsHeight / 2),
    dimensions: { width: detailsWidth, height: detailsHeight / 2 },
  };

  return (
    <Group>
      <Room box={box} doorDirections={doorDirections} />
      <RoomName box={nameBox} name={name} />
      <RoomFeatures box={featuresBox} features={features} />
    </Group>
  );
};

export default BoardRoom;

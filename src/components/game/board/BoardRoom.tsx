import React, { FunctionComponent, useState } from 'react';
import { Group, Text } from 'react-konva';
import Room from '../room/Room';
import RoomName from '../room/RoomName';
import { useGridBox } from './grid';
import { Room as RoomModel } from '../../../features/models';
import { BoundingBox, Dimensions, getRoomDetailsBox } from '../../layout';
import RoomFeatures from '../room/RoomFeatures';
import { translate } from '../../geometry';
import Hovercard, { CardDirection } from '../../Hovercard';

const hovercardDimensions: Dimensions = { width: 200, height: 200 };

interface RoomHovercardProps {
  hovered: boolean;
  roomBox: BoundingBox;
  room: RoomModel;
}

const RoomHovercard: FunctionComponent<RoomHovercardProps> = ({
  hovered,
  roomBox,
  room: { name, description },
}) => {
  return (
    <Hovercard
      enabled={hovered}
      targetBox={roomBox}
      contentDimensions={hovercardDimensions}
      direction={CardDirection.RIGHT}
      renderContent={({ topLeft, dimensions: { width, height } }) => {
        const { x, y } = topLeft;
        return (
          <Group x={x} y={y}>
            <Text
              x={0}
              y={0}
              width={width}
              height={height / 5}
              text={name}
              align="center"
              verticalAlign="middle"
              fontSize={20}
              fontStyle="bold"
            />
            <Text
              x={0}
              y={(3 * height) / 10}
              width={width}
              height={(7 * height) / 10}
              text={description}
              align="center"
              verticalAlign="middle"
              fontSize={16}
            />
          </Group>
        );
      }}
    />
  );
};

const BoardRoom: FunctionComponent<RoomModel> = (room) => {
  const { name, loc, doorDirections, features, barrier } = room;
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
  const [hovered, setHovered] = useState(false);

  return (
    <Group>
      <Group
        onTap={() => setHovered(!hovered)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Room box={box} doorDirections={doorDirections} />
        <RoomName box={nameBox} name={name} />
        <RoomFeatures
          box={featuresBox}
          features={features.concat(barrier?.features || [])}
        />
      </Group>
      <RoomHovercard hovered={hovered} roomBox={box} room={room} />
    </Group>
  );
};

export default BoardRoom;

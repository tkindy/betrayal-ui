import React, { FunctionComponent } from 'react';
import Hovercard, { CardDirection } from '../Hovercard';
import { BoundingBox, Dimensions } from '../layout';
import { Group, Text } from 'react-konva';
import { Player } from '../../features/models';
import { translate } from '../geometry';

const DIMENSIONS: Dimensions = { width: 200, height: 50 };

interface TraitProps {
  box: BoundingBox;
  name: string;
  value: number;
}

const Trait: FunctionComponent<TraitProps> = ({
  box: {
    topLeft,
    dimensions: { width, height },
  },
  name,
  value,
}) => {
  const { x, y } = topLeft;

  return (
    <Group>
      <Text
        x={x}
        y={y}
        width={width}
        height={height / 2}
        text={name}
        align="center"
        verticalAlign="bottom"
        padding={10}
      />
      <Text
        x={x}
        y={y + height / 2}
        width={width}
        height={height / 2}
        text={`${value}`}
        align="center"
        fontSize={24}
      />
    </Group>
  );
};

interface PlayerHovercardProps {
  hovered: boolean;
  playerBox: BoundingBox;
  player: Player;
}

const PlayerHovercard: FunctionComponent<PlayerHovercardProps> = ({
  hovered,
  playerBox,
  player,
}) => {
  return (
    <Hovercard
      enabled={hovered}
      targetBox={playerBox}
      contentDimensions={DIMENSIONS}
      direction={CardDirection.RIGHT}
      renderContent={({ topLeft, dimensions: { width, height } }) => {
        const traitWidth = width / 4;

        return (
          <Group>
            {[
              { name: 'SPD', value: player.speed },
              { name: 'MGT', value: player.might },
              { name: 'SAN', value: player.sanity },
              { name: 'KNO', value: player.knowledge },
            ].map(({ name, value }, i) => (
              <Trait
                key={name}
                box={{
                  topLeft: translate(topLeft, i * traitWidth, 0),
                  dimensions: { width: traitWidth, height },
                }}
                name={name}
                value={value}
              />
            ))}
          </Group>
        );
      }}
    />
  );
};

export default PlayerHovercard;

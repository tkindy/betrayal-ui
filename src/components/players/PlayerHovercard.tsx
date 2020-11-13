import React, { FunctionComponent } from 'react';
import Hovercard, { CardDirection } from '../Hovercard';
import { BoundingBox } from '../layout';
import { Text } from 'react-konva';

interface PlayerHovercardProps {
  hovered: boolean;
  playerBox: BoundingBox;
}

const PlayerHovercard: FunctionComponent<PlayerHovercardProps> = ({
  hovered,
  playerBox,
}) => {
  return (
    <Hovercard
      enabled={hovered}
      targetBox={playerBox}
      contentDimensions={{ width: 100, height: 200 }}
      direction={CardDirection.RIGHT}
      renderContent={({ topLeft: { x, y }, dimensions: { width, height } }) => (
        <Text
          x={x}
          y={y}
          width={width}
          height={height}
          text="Hello, world!"
          fontSize={24}
        />
      )}
    />
  );
};

export default PlayerHovercard;

import React, { FunctionComponent } from 'react';
import Hovercard, { CardDirection } from '../Hovercard';
import { BoundingBox } from '../layout';
import { Text } from 'react-konva';
import { PlayerColor } from '../../features/models';

interface PlayerHovercardProps {
  hovered: boolean;
  playerBox: BoundingBox;
  color: PlayerColor;
}

const PlayerHovercard: FunctionComponent<PlayerHovercardProps> = ({
  hovered,
  playerBox,
  color,
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
          text={color}
          fontSize={24}
          align="center"
          verticalAlign="middle"
        />
      )}
    />
  );
};

export default PlayerHovercard;

import React, { FunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import { BoundingBox, Dimensions } from '../../layout';
import { useWindowDimensions } from '../../windowDimensions';
import { SIDEBAR_MARGIN, SIDEBAR_WIDTH } from '../sidebar/Sidebar';

interface PlayerInventoryBarProps {}

const INVENTORY_BAR_HEIGHT = SIDEBAR_WIDTH;
const INVENTORY_BAR_MARGIN = SIDEBAR_MARGIN;

const getBox: (windowDimensions: Dimensions) => BoundingBox = ({
  width: windowWidth,
  height: windowHeight,
}) => {
  return {
    topLeft: {
      x: INVENTORY_BAR_MARGIN,
      y: windowHeight - INVENTORY_BAR_MARGIN - INVENTORY_BAR_HEIGHT,
    },
    dimensions: {
      width:
        windowWidth - 2 * INVENTORY_BAR_MARGIN - SIDEBAR_WIDTH - SIDEBAR_MARGIN,
      height: INVENTORY_BAR_HEIGHT,
    },
  };
};

const PlayerInventoryBar: FunctionComponent<PlayerInventoryBarProps> = () => {
  const {
    topLeft,
    dimensions: { width, height },
  } = getBox(useWindowDimensions());
  const { x, y } = topLeft;

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="grey"
        stroke="black"
        cornerRadius={10}
      />
    </Group>
  );
};

export default PlayerInventoryBar;

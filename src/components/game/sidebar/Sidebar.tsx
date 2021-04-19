import React, { FunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import ZoomControl from './ZoomControl';
import { translate } from '../../geometry';
import { BoundingBox, Dimensions } from '../../layout';
import { useWindowDimensions } from '../../windowDimensions';
import FlexContainer, { FlexDirection } from './flex/FlexContainer';
import RoomStack from './roomStack/RoomStack';
import DrawControl from './DrawControl';
import RollDiceControl from './RollDiceControl';
import AddMonsterControl from './AddMonsterControl';
import DOMPortal from '../portal/DOMPortal';

export const SIDEBAR_WIDTH = 215;
export const SIDEBAR_MARGIN = 10;
export const SIDEBAR_PADDING = 10;

const getBox: (windowDimensions: Dimensions) => BoundingBox = ({
  width: windowWidth,
  height: windowHeight,
}) => {
  return {
    topLeft: {
      x: windowWidth - SIDEBAR_MARGIN - SIDEBAR_WIDTH,
      y: SIDEBAR_MARGIN,
    },
    dimensions: {
      width: SIDEBAR_WIDTH,
      height: windowHeight - 2 * SIDEBAR_MARGIN,
    },
  };
};

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
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
      <FlexContainer
        box={{
          topLeft: translate(topLeft, SIDEBAR_PADDING, SIDEBAR_PADDING),
          dimensions: {
            width: width - 2 * SIDEBAR_PADDING,
            height: height - 2 * SIDEBAR_PADDING,
          },
        }}
        direction={FlexDirection.COLUMN}
      >
        {[
          { units: 1, render: (box) => <ZoomControl box={box} /> },
          { units: 2, render: (box) => <DrawControl box={box} /> },
          {
            units: 2,
            render: (box) => (
              <DOMPortal name="rollDiceControl">
                <RollDiceControl box={box} />{' '}
              </DOMPortal>
            ),
          },
          { units: 1, render: (box) => <AddMonsterControl box={box} /> },
          { units: 1, render: () => null },
          { units: 3, render: (box) => <RoomStack box={box} /> },
        ]}
      </FlexContainer>
    </Group>
  );
};

export default Sidebar;

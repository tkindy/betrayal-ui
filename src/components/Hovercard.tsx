import React, { FunctionComponent, ReactElement } from 'react';
import { Group, Rect } from 'react-konva';
import { translate } from './geometry';
import { BoundingBox, Dimensions, getCenter } from './layout';
import OverlayPortal from './portal/OverlayPortal';

const spacing = 20;

export enum CardDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

const buildBox: (
  targetBox: BoundingBox,
  contentDimensions: Dimensions,
  direction: CardDirection
) => BoundingBox = (targetBox, contentDimensions, direction) => {
  const {
    dimensions: { width: targetWidth, height: targetHeight },
  } = targetBox;
  const targetCenter = getCenter(targetBox);
  const { width: contentWidth, height: contentHeight } = contentDimensions;

  let dx, dy;
  switch (direction) {
    case CardDirection.UP:
      dx = -contentWidth / 2;
      dy = -(targetHeight / 2 + spacing + contentHeight);
      break;
    case CardDirection.DOWN:
      dx = -contentWidth / 2;
      dy = targetHeight / 2 + spacing;
      break;
    case CardDirection.LEFT:
      dx = -(targetWidth / 2 + spacing + contentWidth);
      dy = -contentHeight / 2;
      break;
    case CardDirection.RIGHT:
      dx = targetWidth / 2 + spacing;
      dy = -contentHeight / 2;
      break;
  }

  return {
    topLeft: translate(targetCenter, dx, dy),
    dimensions: contentDimensions,
  };
};

interface HovercardProps {
  enabled: boolean;
  targetBox: BoundingBox;
  contentDimensions: Dimensions;
  direction: CardDirection;
  renderContent: (box: BoundingBox) => ReactElement<any, any>;
}

const Hovercard: FunctionComponent<HovercardProps> = ({
  enabled,
  targetBox,
  contentDimensions,
  direction,
  renderContent,
}) => {
  const box = buildBox(targetBox, contentDimensions, direction);
  const {
    topLeft: { x, y },
    dimensions: { width, height },
  } = box;

  return (
    <OverlayPortal enabled={enabled}>
      {enabled && (
        <Group>
          <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="gray"
            stroke="black"
          />
          {renderContent(box)}
        </Group>
      )}
    </OverlayPortal>
  );
};

export default Hovercard;

import React, { FunctionComponent, ReactElement } from 'react';
import { Group, Line } from 'react-konva';
import { pointsToArray, translate } from './geometry';
import { BoundingBox, Dimensions, getCenter } from './layout';
import OverlayPortal from './portal/OverlayPortal';

const spacing = 20;
const padding = 15;
const triangleBaseWidth = 20;
const triangleHeight = 15;

export enum CardDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

const buildContentBox: (
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
      dy = -(targetHeight / 2 + spacing + padding + contentHeight);
      break;
    case CardDirection.DOWN:
      dx = -contentWidth / 2;
      dy = targetHeight / 2 + spacing + padding;
      break;
    case CardDirection.LEFT:
      dx = -(targetWidth / 2 + spacing + padding + contentWidth);
      dy = -contentHeight / 2;
      break;
    case CardDirection.RIGHT:
      dx = targetWidth / 2 + spacing + padding;
      dy = -contentHeight / 2;
      break;
  }

  return {
    topLeft: translate(targetCenter, dx, dy),
    dimensions: contentDimensions,
  };
};

const getCardPoints: (
  contentBox: BoundingBox,
  direction: CardDirection
) => number[] = (
  {
    topLeft: contentTopLeft,
    dimensions: { width: contentWidth, height: contentHeight },
  },
  direction
) => {
  const topLeft = translate(contentTopLeft, -padding, -padding);
  const width = contentWidth + 2 * padding;
  const height = contentHeight + 2 * padding;
  const rectPoints = [
    topLeft,
    translate(topLeft, width, 0),
    translate(topLeft, width, height),
    translate(topLeft, 0, height),
  ];

  let triangleIndex, trianglePoints;
  switch (direction) {
    case CardDirection.UP:
      triangleIndex = 3;
      trianglePoints = [
        translate(topLeft, width / 2 + triangleBaseWidth / 2, height),
        translate(topLeft, width / 2, height + triangleHeight),
        translate(topLeft, width / 2 - triangleBaseWidth / 2, height),
      ];
      break;
    case CardDirection.DOWN:
      triangleIndex = 1;
      trianglePoints = [
        translate(topLeft, width / 2 - triangleBaseWidth / 2, 0),
        translate(topLeft, width / 2, -triangleHeight),
        translate(topLeft, width / 2 + triangleBaseWidth / 2, 0),
      ];
      break;
    case CardDirection.LEFT:
      triangleIndex = 2;
      trianglePoints = [
        translate(topLeft, width, height / 2 - triangleBaseWidth / 2),
        translate(topLeft, width + triangleHeight, height / 2),
        translate(topLeft, width, height / 2 + triangleBaseWidth / 2),
      ];
      break;
    case CardDirection.RIGHT:
      triangleIndex = 4;
      trianglePoints = [
        translate(topLeft, 0, height / 2 + triangleBaseWidth / 2),
        translate(topLeft, -triangleHeight, height / 2),
        translate(topLeft, 0, height / 2 - triangleBaseWidth / 2),
      ];
      break;
  }

  return pointsToArray(
    rectPoints
      .slice(0, triangleIndex)
      .concat(trianglePoints)
      .concat(rectPoints.slice(triangleIndex))
  );
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
  const contentBox = buildContentBox(targetBox, contentDimensions, direction);

  return (
    <OverlayPortal enabled={enabled}>
      {enabled && (
        <Group>
          <Line
            points={getCardPoints(contentBox, direction)}
            closed={true}
            fill="gray"
            stroke="black"
          />
          {renderContent(contentBox)}
        </Group>
      )}
    </OverlayPortal>
  );
};

export default Hovercard;

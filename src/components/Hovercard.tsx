import React, { FunctionComponent, ReactElement } from 'react';
import { Group, Rect } from 'react-konva';
import { translate } from './geometry';
import { BoundingBox, Dimensions } from './layout';
import OverlayPortal from './portal/OverlayPortal';

const spacing = 10;

const buildBox: (
  targetBox: BoundingBox,
  contentDimensions: Dimensions
) => BoundingBox = (
  { topLeft: targetTopLeft, dimensions: { width: targetWidth } },
  contentDimensions
) => {
  const targetCenterTop = translate(targetTopLeft, targetWidth / 2, 0);
  const { width: contentWidth, height: contentHeight } = contentDimensions;

  return {
    topLeft: translate(
      targetCenterTop,
      -contentWidth / 2,
      -(spacing + contentHeight)
    ),
    dimensions: contentDimensions,
  };
};

interface HovercardProps {
  enabled: boolean;
  targetBox: BoundingBox;
  contentDimensions: Dimensions;
  renderContent: (box: BoundingBox) => ReactElement<any, any>;
}

const Hovercard: FunctionComponent<HovercardProps> = ({
  enabled,
  targetBox,
  contentDimensions,
  renderContent,
}) => {
  const box = buildBox(targetBox, contentDimensions);
  const {
    topLeft: { x, y },
    dimensions: { width, height },
  } = box;

  return (
    <OverlayPortal enabled={enabled}>
      {enabled && (
        <Group>
          <Rect x={x} y={y} width={width} height={height} fill="gray" />
          {renderContent(box)}
        </Group>
      )}
    </OverlayPortal>
  );
};

export default Hovercard;

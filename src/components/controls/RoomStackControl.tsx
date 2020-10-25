import React, { CSSProperties, FunctionComponent } from 'react';
import { translate } from '../geometry';
import {
  calcUnitsLength,
  getAreaBoundingBox,
  xUnits,
  yUnits,
} from '../roomStack/shared';

import { useWindowDimensions } from '../windowDimensions';

interface RoomStackControlProps {}

const RoomStackControl: FunctionComponent<RoomStackControlProps> = () => {
  const {
    topLeft: areaTopLeft,
    dimensions: { height: areaHeight },
  } = getAreaBoundingBox(useWindowDimensions());
  const { x, y } = translate(
    areaTopLeft,
    calcUnitsLength(areaHeight, yUnits.spacing),
    calcUnitsLength(areaHeight, yUnits.spacing + yUnits.room + yUnits.spacing)
  );
  const spacing = calcUnitsLength(areaHeight, yUnits.spacing);
  const buttonWidth = calcUnitsLength(areaHeight, xUnits.button);
  const buttonHeight = calcUnitsLength(areaHeight, yUnits.button);
  const buttonStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    width: buttonWidth,
    height: buttonHeight,
  };

  return (
    <div
      className="room-stack-control"
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: buttonWidth + spacing + buttonWidth,
      }}
    >
      <button style={{ left: 0, ...buttonStyle }}>Use</button>
      <button style={{ left: buttonWidth + spacing, ...buttonStyle }}>
        Next
      </button>
    </div>
  );
};

export default RoomStackControl;

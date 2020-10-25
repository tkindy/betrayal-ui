import React, { CSSProperties, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { flipRoomStack } from '../../features/roomStack';
import { translate } from '../geometry';
import { BoundingBox } from '../layout';
import {
  calcUnitsLength,
  getAreaBoundingBox,
  xUnits,
  yUnits,
} from '../roomStack/shared';

import { useWindowDimensions } from '../windowDimensions';

const getSpacing = (areaHeight: number) =>
  calcUnitsLength(areaHeight, yUnits.spacing);
const getButtonWidth = (areaHeight: number) =>
  calcUnitsLength(areaHeight, xUnits.button);
const getButtonHeight = (areaHeight: number) =>
  calcUnitsLength(areaHeight, yUnits.button);

const getControlBoundingBox: (areaBox: BoundingBox) => BoundingBox = ({
  topLeft: areaTopLeft,
  dimensions: { height: areaHeight },
}) => {
  const topLeft = translate(
    areaTopLeft,
    calcUnitsLength(areaHeight, yUnits.spacing),
    calcUnitsLength(areaHeight, yUnits.spacing + yUnits.room + yUnits.spacing)
  );
  const spacing = getSpacing(areaHeight);
  const buttonWidth = getButtonWidth(areaHeight);
  const buttonHeight = getButtonHeight(areaHeight);

  return {
    topLeft,
    dimensions: {
      width: buttonWidth + spacing + buttonWidth,
      height: buttonHeight,
    },
  };
};

interface RoomStackControlProps {}

const RoomStackControl: FunctionComponent<RoomStackControlProps> = () => {
  const areaBox = getAreaBoundingBox(useWindowDimensions());
  const {
    topLeft: { x, y },
    dimensions: { width, height },
  } = getControlBoundingBox(areaBox);

  const {
    dimensions: { height: areaHeight },
  } = areaBox;
  const spacing = getSpacing(areaHeight);
  const buttonWidth = getButtonWidth(areaHeight);
  const buttonHeight = getButtonHeight(areaHeight);
  const buttonStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    width: buttonWidth,
    height: buttonHeight,
    padding: 0,
  };
  const dispatch = useDispatch();

  return (
    <div
      className="room-stack-control"
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
      }}
    >
      <button
        onClick={() => dispatch(flipRoomStack())}
        style={{ left: 0, ...buttonStyle }}
      >
        Use
      </button>
      <button style={{ left: buttonWidth + spacing, ...buttonStyle }}>
        Next
      </button>
    </div>
  );
};

export default RoomStackControl;

import { translate } from '../geometry';
import { BoundingBox, Dimensions } from '../layout';

export const yUnits = {
  spacing: 1,
  room: 8,
  button: 2,
};

const totalYUnits =
  yUnits.spacing +
  yUnits.room +
  yUnits.spacing +
  yUnits.button +
  yUnits.spacing;

export const xUnits = {
  button: (yUnits.room - yUnits.spacing) / 2,
};

const totalXUnits = yUnits.spacing + yUnits.room + yUnits.spacing;

export const calcUnitsLength = (areaHeight: number, units: number) =>
  areaHeight * (units / totalYUnits);

export const getRoomBoundingBox: (areaBox: BoundingBox) => BoundingBox = (
  areaBox
) => {
  const {
    topLeft: areaTopLeft,
    dimensions: { height: areaHeight },
  } = areaBox;

  const roomSize = calcUnitsLength(areaHeight, yUnits.room);
  const spacing = calcUnitsLength(areaHeight, yUnits.spacing);

  return {
    topLeft: translate(areaTopLeft, spacing, spacing),
    dimensions: {
      width: roomSize,
      height: roomSize,
    },
  };
};

export const getAreaBoundingBox: (
  windowDimensions: Dimensions
) => BoundingBox = (windowDimensions) => {
  const { width: windowWidth, height: windowHeight } = windowDimensions;

  const height = Math.max(windowHeight / 3, 250);
  const width = calcUnitsLength(height, totalXUnits);

  return {
    topLeft: {
      x: windowWidth - width,
      y: windowHeight - height,
    },
    dimensions: {
      width,
      height,
    },
  };
};

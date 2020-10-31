import { Point, translate } from './geometry';

export interface Dimensions {
  width: number;
  height: number;
}

export interface BoundingBox {
  topLeft: Point;
  dimensions: Dimensions;
}

export const getCenter: (box: BoundingBox) => Point = ({
  topLeft,
  dimensions: { width, height },
}) => {
  return translate(topLeft, width / 2, height / 2);
};

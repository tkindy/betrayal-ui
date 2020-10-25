import { Point } from './geometry';

export interface Dimensions {
  width: number;
  height: number;
}

export interface BoundingBox {
  topLeft: Point;
  dimensions: Dimensions;
}

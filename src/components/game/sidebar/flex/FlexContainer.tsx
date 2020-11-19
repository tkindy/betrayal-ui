import Konva from 'konva';
import React, { ReactElement, VoidFunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import { Point, translate } from '../../../geometry';
import { BoundingBox, Dimensions } from '../../../layout';

export enum FlexDirection {
  ROW = 'ROW',
  COLUMN = 'COLUMN',
}

interface FlexItem {
  units: number;
  render: (box: BoundingBox) => ReactElement<any, any> | null;
}

const translateFlex: (
  p: Point,
  amount: number,
  direction: FlexDirection
) => Point = (p, amount, direction) => {
  switch (direction) {
    case FlexDirection.ROW:
      return translate(p, amount, 0);
    case FlexDirection.COLUMN:
      return translate(p, 0, amount);
  }
};

const getFlexItemDimensions: (
  containerDimensions: Dimensions,
  direction: FlexDirection,
  units: number,
  unitLength: number
) => Dimensions = (
  { width: containerWidth, height: containerHeight },
  direction,
  units,
  unitLength
) => {
  switch (direction) {
    case FlexDirection.ROW:
      return { width: units * unitLength, height: containerHeight };
    case FlexDirection.COLUMN:
      return { width: containerWidth, height: units * unitLength };
  }
};

const renderItems: (
  items: FlexItem[],
  containerBox: BoundingBox,
  direction: FlexDirection,
  unitLength: number,
  debug: boolean
) => ReactElement<any, any>[] = (
  items,
  { topLeft: containerTopLeft, dimensions: containerDimensions },
  direction,
  unitLength,
  debug
) => {
  return items.reduce(
    ({ components, usedUnits }, { units, render }) => {
      const box: BoundingBox = {
        topLeft: translateFlex(
          containerTopLeft,
          usedUnits * unitLength,
          direction
        ),
        dimensions: getFlexItemDimensions(
          containerDimensions,
          direction,
          units,
          unitLength
        ),
      };

      const component = render(box);
      let newComponents = [] as ReactElement<any, any>[];

      if (component) {
        newComponents = newComponents.concat(component);
      }
      if (debug) {
        newComponents = newComponents.concat(
          <Rect
            x={box.topLeft.x}
            y={box.topLeft.y}
            width={box.dimensions.width}
            height={box.dimensions.height}
            stroke={Konva.Util.getRandomColor()}
          />
        );
      }

      return {
        components: component ? components.concat(newComponents) : components,
        usedUnits: usedUnits + units,
      };
    },
    {
      components: [] as ReactElement<any, any>[],
      usedUnits: 0,
    }
  ).components;
};

interface FlexContainerProps {
  box: BoundingBox;
  direction: FlexDirection;
  children?: FlexItem[];
  debug?: boolean;
}

const FlexContainer: VoidFunctionComponent<FlexContainerProps> = ({
  box,
  direction,
  children,
  debug = false,
}) => {
  if (!children) {
    return null;
  }

  const { width, height } = box.dimensions;

  let flexDimension;
  switch (direction) {
    case FlexDirection.ROW:
      flexDimension = width;
      break;
    case FlexDirection.COLUMN:
      flexDimension = height;
      break;
  }

  const totalUnits = children
    .map((child) => child.units)
    .reduce((sum, prop) => sum + prop);
  const unitLength = flexDimension / totalUnits;

  return (
    <Group>{renderItems(children, box, direction, unitLength, debug)}</Group>
  );
};

export default FlexContainer;

import { KonvaEventObject } from 'konva/types/Node';
import React, { ComponentType, FunctionComponent, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { Subtract } from 'utility-types';
import { Point } from './geometry';

type MouseEventHandler = (e: KonvaEventObject<MouseEvent>) => void;

export interface HovercardMouseHandlers {
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  onMouseMove: MouseEventHandler;
}

export interface HasHovercardMouseHandlers {
  hovercardMouseHandlers: HovercardMouseHandlers;
}

interface HovercardProps {
  x: number;
  y: number;
}

const Hovercard: FunctionComponent<HovercardProps> = ({ x, y }) => {
  return <Rect x={x} y={y} width={100} height={30} fill="yellow" />;
};

export default Hovercard;

export const withHovercard = <P extends HasHovercardMouseHandlers>(
  Component: ComponentType<P>
) => {
  return (props: Subtract<P, HasHovercardMouseHandlers>) => {
    const [visible, setVisible] = useState(false);
    const [{ x, y }, setPoint] = useState<Point>({ x: 0, y: 0 });

    return (
      <Group>
        <Component
          {...(props as P)}
          hovercardMouseHandlers={{
            onMouseEnter: () => setVisible(true),
            onMouseLeave: () => setVisible(false),
            onMouseMove: (e) => setPoint({ x: e.evt.x + 10, y: e.evt.y + 10 }),
          }}
        />
        {visible && <Hovercard x={x} y={y} />}
      </Group>
    );
  };
};

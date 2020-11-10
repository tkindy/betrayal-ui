import { KonvaEventObject } from 'konva/types/Node';
import React, { ComponentType, FunctionComponent, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { Subtract } from 'utility-types';
import { Point } from './geometry';

type MouseEventHandler = (e: KonvaEventObject<MouseEvent>) => void;

export interface TooltipMouseHandlers {
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  onMouseMove: MouseEventHandler;
}

export interface HasTooltipMouseHandlers {
  tooltipMouseHandlers: TooltipMouseHandlers;
}

interface TooltipProps {
  x: number;
  y: number;
}

const Tooltip: FunctionComponent<TooltipProps> = ({ x, y }) => {
  return <Rect x={x} y={y} width={100} height={30} fill="yellow" />;
};

export default Tooltip;

export const withTooltip = <P extends HasTooltipMouseHandlers>(
  Component: ComponentType<P>
) => {
  return (props: Subtract<P, HasTooltipMouseHandlers>) => {
    const [visible, setVisible] = useState(false);
    const [{ x, y }, setPoint] = useState<Point>({ x: 0, y: 0 });

    return (
      <Group>
        <Component
          {...(props as P)}
          tooltipMouseHandlers={{
            onMouseEnter: () => setVisible(true),
            onMouseLeave: () => setVisible(false),
            onMouseMove: (e) => setPoint({ x: e.evt.x + 10, y: e.evt.y + 10 }),
          }}
        />
        {visible && <Tooltip x={x} y={y} />}
      </Group>
    );
  };
};

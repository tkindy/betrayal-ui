import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Group } from 'react-konva';
import { Group as GroupElem } from 'konva/types/Group';

// Adapted from https://konvajs.org/docs/react/Canvas_Portal.html

interface PortalProps {
  selector: string;
  enabled: boolean;
}

const Portal: FunctionComponent<PortalProps> = ({
  selector,
  enabled,
  children,
}) => {
  const outer = useRef<GroupElem>(null);
  const inner = useRef<GroupElem>(null);

  useEffect(() => {
    const stage = outer.current?.getStage();
    const newContainer = stage?.findOne(selector);

    if (enabled && newContainer) {
      inner.current?.moveTo(newContainer);
    } else {
      inner.current?.moveTo(outer.current);
    }

    // manually redraw layers
    outer.current?.getLayer()?.batchDraw();
    if (newContainer) {
      newContainer.getLayer()?.batchDraw();
    }
  }, [selector, enabled]);

  return (
    <Group name="_outer_portal" ref={outer}>
      <Group name="_inner_portal" ref={inner}>
        {children}
      </Group>
    </Group>
  );
};

export default Portal;

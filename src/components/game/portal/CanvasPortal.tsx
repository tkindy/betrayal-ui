import { FunctionComponent, useEffect, useRef } from 'react';
import { Group } from 'react-konva';
import { Group as GroupType } from 'konva/lib/Group';

// For drawing canvas elements in another part of the react-konva tree
// Adapted from https://konvajs.org/docs/react/Canvas_Portal.html

export interface PortalProps {
  selector: string;
  enabled: boolean;
}

const CanvasPortal: FunctionComponent<PortalProps> = ({
  selector,
  enabled,
  children,
}) => {
  const outer = useRef<GroupType>(null);
  const inner = useRef<GroupType>(null);

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

export default CanvasPortal;

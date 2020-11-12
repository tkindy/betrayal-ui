import React, { FunctionComponent } from 'react';
import { Rect } from 'react-konva';
import OverlayPortal from './portal/OverlayPortal';

interface HovercardProps {
  enabled: boolean;
  x: number;
  y: number;
}

const Hovercard: FunctionComponent<HovercardProps> = ({ enabled, x, y }) => {
  return (
    <OverlayPortal enabled={enabled}>
      {enabled && <Rect x={x} y={y} width={100} height={30} fill="yellow" />}
    </OverlayPortal>
  );
};

export default Hovercard;

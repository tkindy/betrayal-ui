import React, { FunctionComponent } from 'react';
import CanvasPortal, { PortalProps } from './CanvasPortal';

type OverlayPortalProps = Omit<PortalProps, 'selector'>;

const OverlayPortal: FunctionComponent<OverlayPortalProps> = ({
  children,
  ...rest
}) => {
  return (
    <CanvasPortal selector=".overlay" {...rest}>
      {children}
    </CanvasPortal>
  );
};

export default OverlayPortal;

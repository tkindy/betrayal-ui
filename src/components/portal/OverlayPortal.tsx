import React, { FunctionComponent } from 'react';
import Portal, { PortalProps } from './Portal';

type OverlayPortalProps = Omit<PortalProps, 'selector'>;

const OverlayPortal: FunctionComponent<OverlayPortalProps> = ({
  children,
  ...rest
}) => {
  return (
    <Portal selector=".overlay" {...rest}>
      {children}
    </Portal>
  );
};

export default OverlayPortal;

import React, { CSSProperties, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { zoomIn, zoomOut } from '../../features/zoom';
import { BoundingBox } from '../layout';
import DOMPortal from '../portal/DOMPortal';

interface ZoomControlProps {
  box: BoundingBox;
}

const ZoomControl: FunctionComponent<ZoomControlProps> = ({
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
}) => {
  const dispatch = useDispatch();
  const buttonStyle: CSSProperties = {
    flex: '0 1 50px',
    height: '35px',
  };

  return (
    <DOMPortal name="zoomControl">
      <div
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width,
          height,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <button onClick={() => dispatch(zoomIn())} style={buttonStyle}>
          +
        </button>
        <button onClick={() => dispatch(zoomOut())} style={buttonStyle}>
          -
        </button>
      </div>
    </DOMPortal>
  );
};

export default ZoomControl;

import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { zoomIn, zoomOut } from '../../../features/zoom';
import { BoundingBox } from '../../layout';
import DOMPortal from '../portal/DOMPortal';
import './ZoomControl.css';

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
        <button
          className="zoomButton zoomIn"
          onClick={() => dispatch(zoomIn())}
        >
          +
        </button>
        <button
          className="zoomButton zoomOut"
          onClick={() => dispatch(zoomOut())}
        >
          -
        </button>
      </div>
    </DOMPortal>
  );
};

export default ZoomControl;

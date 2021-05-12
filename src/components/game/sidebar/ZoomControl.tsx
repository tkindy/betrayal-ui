import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { zoomIn, zoomOut } from '../../../features/zoom';
import { BoundingBox } from '../../layout';
import './ZoomControl.css';

interface ZoomControlProps {
  box: BoundingBox;
}

const ZoomControl: FunctionComponent<ZoomControlProps> = ({
  box: {
    dimensions: { height },
  },
}) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        height,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <button className="zoomButton zoomIn" onClick={() => dispatch(zoomIn())}>
        +
      </button>
      <button
        className="zoomButton zoomOut"
        onClick={() => dispatch(zoomOut())}
      >
        -
      </button>
    </div>
  );
};

export default ZoomControl;

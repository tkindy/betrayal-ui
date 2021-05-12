import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { zoomIn, zoomOut } from '../../../features/zoom';
import './ZoomControl.css';

interface ZoomControlProps {}

const ZoomControl: FunctionComponent<ZoomControlProps> = () => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
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

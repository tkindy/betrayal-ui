import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { zoomIn, zoomOut } from '../../features/zoom';

interface ZoomControlProps {}

const ZoomControl: FunctionComponent<ZoomControlProps> = () => {
  const dispatch = useDispatch();
  return (
    <div style={{ position: 'absolute' }}>
      <button onClick={() => dispatch(zoomIn())}>+</button>
      <button onClick={() => dispatch(zoomOut())}>-</button>
    </div>
  );
};

export default ZoomControl;

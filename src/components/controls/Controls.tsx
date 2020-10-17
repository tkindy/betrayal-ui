import React, { FunctionComponent } from 'react';
import './Controls.css';
import ZoomControl from './ZoomControl';

interface ControlsProps {}

const Controls: FunctionComponent<ControlsProps> = () => {
  return (
    <div className="controls">
      <ZoomControl />
    </div>
  );
};

export default Controls;

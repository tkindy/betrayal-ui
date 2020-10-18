import React, { FunctionComponent } from 'react';
import './Controls.css';
import RoomStackControl from './RoomStackControl';
import ZoomControl from './ZoomControl';

interface ControlsProps {}

const Controls: FunctionComponent<ControlsProps> = () => {
  return (
    <div className="controls">
      <ZoomControl />
      <RoomStackControl />
    </div>
  );
};

export default Controls;

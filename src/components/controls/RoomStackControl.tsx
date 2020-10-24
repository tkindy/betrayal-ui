import React, { FunctionComponent } from 'react';
import { useStackDimensions } from '../roomStack/RoomStack';
import { useWindowDimensions } from '../windowDimensions';

interface RoomStackControlProps {}

const RoomStackControl: FunctionComponent<RoomStackControlProps> = () => {
  const { height } = useWindowDimensions();
  const {
    topLeft: { x: stackX },
    dimensions: { width: stackWidth },
  } = useStackDimensions();

  return (
    <div
      className="room-stack-control"
      style={{
        position: 'absolute',
        top: height - 50,
        left: stackX,
        width: stackWidth,
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <button>Use</button>
      <button>Next</button>
    </div>
  );
};

export default RoomStackControl;

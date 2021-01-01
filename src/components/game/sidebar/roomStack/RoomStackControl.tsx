import React, { CSSProperties, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  flipRoomStack,
  rotateFlipped,
  skipRoom,
} from '../../../../features/roomStack';
import { RootState } from '../../../../store';
import { BoundingBox } from '../../../layout';
import DOMPortal from '../../portal/DOMPortal';

const StackButtons: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const buttonStyle: CSSProperties = {
    flex: '2',
    height: '100%',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <button onClick={() => dispatch(flipRoomStack())} style={buttonStyle}>
        Use
      </button>
      <div style={{ flex: '1' }}></div>
      <button onClick={() => dispatch(skipRoom())} style={buttonStyle}>
        Next
      </button>
    </div>
  );
};

const FlippedRoomButtons: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ height: '100%' }}>
      <button
        onClick={() => dispatch(rotateFlipped())}
        style={{ height: '100%', width: '100%' }}
      >
        Rotate
      </button>
    </div>
  );
};

interface RoomStackControlProps {
  box: BoundingBox;
}

const RoomStackControl: FunctionComponent<RoomStackControlProps> = ({
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
}) => {
  const flippedRoom = useSelector(
    (state: RootState) => state.roomStack.flippedRoom
  );

  return (
    <DOMPortal name="roomStackControls">
      <div
        className="room-stack-control"
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width,
          height,
        }}
      >
        {flippedRoom ? <FlippedRoomButtons /> : <StackButtons />}
      </div>
    </DOMPortal>
  );
};

export default RoomStackControl;
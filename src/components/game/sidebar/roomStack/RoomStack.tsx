import React, { FunctionComponent } from 'react';
import RoomStackControl from './RoomStackControl';
import { translate } from '../../../geometry';
import { BoundingBox } from '../../../layout';
import FlexContainer, { FlexDirection } from '../flex/FlexContainer';
import StackRoom from './StackRoom';

interface RoomStackProps {
  box: BoundingBox;
}

const RoomStack: FunctionComponent<RoomStackProps> = ({ box }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StackRoom />
      <FlexContainer box={box} direction={FlexDirection.COLUMN}>
        {[
          { units: 8, render: () => null },
          { units: 1, render: () => null },
          { units: 2, render: (box) => <RoomStackControl box={box} /> },
        ]}
      </FlexContainer>
    </div>
  );
};

export default RoomStack;

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
    <FlexContainer box={box} direction={FlexDirection.COLUMN}>
      {[
        {
          units: 8,
          render: ({
            topLeft: flexTopLeft,
            dimensions: { width: flexWidth, height: flexHeight },
          }) => {
            const roomSize = Math.min(flexWidth, flexHeight);
            const stackBox: BoundingBox = {
              topLeft: translate(
                flexTopLeft,
                flexWidth / 2 - roomSize / 2,
                flexHeight / 2 - roomSize / 2
              ),
              dimensions: { width: roomSize, height: roomSize },
            };
            return <StackRoom box={stackBox} />;
          },
        },
        { units: 1, render: () => null },
        { units: 2, render: (box) => <RoomStackControl box={box} /> },
      ]}
    </FlexContainer>
  );
};

export default RoomStack;

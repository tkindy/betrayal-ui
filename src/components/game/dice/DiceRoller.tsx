import React, { FC } from 'react';
import { BoundingBox, Dimensions } from '../../layout';
import RollDiceControl from './RollDiceControl';

interface DiceRollerProps {
  box: BoundingBox;
  expanded: boolean;
}

const DiceRoller: FC<DiceRollerProps> = ({ box, expanded }) => {
  const {
    topLeft,
    dimensions: { width, height },
  } = box;
  const { x, y } = topLeft;
  const padding = 10;
  const controlDimensions: Dimensions = {
    width: width - 2 * padding,
    height: height - 2 * padding,
  };

  return expanded ? (
    <div
      className="dice-background"
      style={{
        backgroundColor: 'gray',
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 2,
      }}
    >
      <RollDiceControl dimensions={controlDimensions} />
    </div>
  ) : null;
};

export default DiceRoller;

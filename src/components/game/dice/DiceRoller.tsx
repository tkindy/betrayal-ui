import React, { FC } from 'react';
import { translate } from '../../geometry';
import { BoundingBox } from '../../layout';
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
  const controlBox: BoundingBox = {
    topLeft: { x: padding, y: padding },
    dimensions: { width: width - 2 * padding, height: height - 2 * padding },
  };

  return expanded ? (
    <div
      className="dice-background"
      style={{
        backgroundColor: 'gray',
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        zIndex: 2,
      }}
    >
      <RollDiceControl box={controlBox} />
    </div>
  ) : null;
};

export default DiceRoller;

import React, { FC } from 'react';
import { BoundingBox, Dimensions } from '../../layout';
import RollDiceControl from './RollDiceControl';
import './DiceRoller.css';

interface DiceRollerProps {
  box: BoundingBox;
  expanded: boolean;
}

const DiceRoller: FC<DiceRollerProps> = ({ box, expanded }) => {
  const {
    dimensions: { width, height },
  } = box;
  const padding = 10;
  const controlDimensions: Dimensions = {
    width: width - 2 * padding,
    height: height - 2 * padding,
  };

  return expanded ? (
    <div className="dice-background">
      <RollDiceControl dimensions={controlDimensions} />
    </div>
  ) : null;
};

export default DiceRoller;

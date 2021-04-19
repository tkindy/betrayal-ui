import React, { FC } from 'react';
import RollDiceControl from './RollDiceControl';
import './DiceRoller.css';

interface DiceRollerProps {
  expanded: boolean;
}

const DiceRoller: FC<DiceRollerProps> = ({ expanded }) => {
  return expanded ? (
    <div className="dice-background">
      <RollDiceControl />
    </div>
  ) : null;
};

export default DiceRoller;

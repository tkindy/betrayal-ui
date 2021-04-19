import React, { FC, useState } from 'react';
import DiceButton from './DiceButton';
import DiceControl from './DiceControl';
import './Dice.css';

const Dice: FC<{}> = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="dice-container">
      <DiceButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
      <DiceControl expanded={expanded} />
    </div>
  );
};

export default Dice;

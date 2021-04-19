import React, { FC, useState } from 'react';
import DiceButton from './DiceButton';
import DiceRoller from './DiceRoller';
import './Dice.css';

const Dice: FC<{}> = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="dice-container">
      <DiceButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
      <DiceRoller
        box={{
          topLeft: { x: 10, y: 70 },
          dimensions: { width: 150, height: 150 },
        }}
        expanded={expanded}
      />
    </div>
  );
};

export default Dice;

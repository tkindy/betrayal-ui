import React, { FC, useState } from 'react';
import DiceButton from './DiceButton';
import DiceRoller from './DiceRoller';

const Dice: FC<{}> = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <DiceButton
        box={{
          topLeft: { x: 10, y: 10 },
          dimensions: { width: 50, height: 50 },
        }}
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      />
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

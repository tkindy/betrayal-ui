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
          dimensions: { width: 60, height: 60 },
        }}
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      />
      <DiceRoller
        box={{
          topLeft: { x: 10, y: 80 },
          dimensions: { width: 150, height: 100 },
        }}
        expanded={expanded}
      />
    </div>
  );
};

export default Dice;
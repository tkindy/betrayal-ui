import React, { FC, useState } from 'react';
import DiceButton from './DiceButton';

const Dice: FC<{}> = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <DiceButton
      box={{ topLeft: { x: 10, y: 10 }, dimensions: { width: 60, height: 60 } }}
      expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    />
  );
};

export default Dice;

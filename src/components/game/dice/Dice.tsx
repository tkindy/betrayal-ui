import React, { FC, useState } from 'react';
import DiceButton from './DiceButton';

const Dice: FC<{}> = () => {
  return (
    <DiceButton
      box={{ topLeft: { x: 10, y: 10 }, dimensions: { width: 60, height: 60 } }}
    />
  );
};

export default Dice;

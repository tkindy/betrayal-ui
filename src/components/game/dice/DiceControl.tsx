import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rollDice } from '../../../features/diceRolls';
import { RootState } from '../../../store';
import zero from './zero.svg';
import one from './one.svg';
import two from './two.svg';
import './DiceControl.css';

interface DieProps {
  value: number;
}

const Die: FunctionComponent<DieProps> = ({ value }) => {
  let src;
  switch (value) {
    case 0:
      src = zero;
      break;
    case 1:
      src = one;
      break;
    case 2:
      src = two;
      break;
  }

  return <img src={src} className="die-value" />;
};

interface DiceRowProps {
  values: number[];
}

const DiceRow: FunctionComponent<DiceRowProps> = ({ values }) => {
  return (
    <div className="dice-row">
      {values.map((value) => (
        <Die value={value} />
      ))}
    </div>
  );
};

interface DiceProps {
  values?: number[];
}

const Dice: FunctionComponent<DiceProps> = ({ values }) => {
  let rows;
  if (values) {
    rows = [
      <DiceRow values={values.slice(0, 4)} />,
      <DiceRow values={values.slice(4, 8)} />,
    ];
  }

  return <div>{rows}</div>;
};

interface RollDiceControlProps {
  expanded: boolean;
}

const DiceControl: FunctionComponent<RollDiceControlProps> = ({ expanded }) => {
  const roll = useSelector((state: RootState) => state.diceRolls.roll);
  const dispatch = useDispatch();
  const [numDice, setNumDice] = useState<number>(8);

  if (!expanded) {
    return null;
  }

  return (
    <div className="dice-background">
      <div className="dice-controls">
        <input
          className="dice-count"
          type="number"
          min="1"
          max="8"
          value={numDice}
          onChange={(e) => setNumDice(parseInt(e.target.value))}
        />
        <button
          className="roll-dice-button"
          onClick={() => dispatch(rollDice({ numDice }))}
        >
          Roll
        </button>
      </div>

      <Dice values={roll} />
    </div>
  );
};

export default DiceControl;

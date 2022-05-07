import { FunctionComponent, useState } from 'react';
import { rollDice } from '../../../features/diceRolls';
import './DiceControl.css';
import { useAppDispatch, useAppSelector } from '../../../hooks';

interface DieProps {
  value: number;
}

const Die: FunctionComponent<DieProps> = ({ value }) => {
  let name;
  switch (value) {
    case 0:
      name = 'zero';
      break;
    case 1:
      name = 'one';
      break;
    case 2:
      name = 'two';
      break;
  }

  return (
    <img src={`/images/dice/${name}.svg`} alt={name} className="die-value" />
  );
};

interface DiceRowProps {
  values: number[];
}

const DiceRow: FunctionComponent<DiceRowProps> = ({ values }) => {
  return (
    <div className="dice-row">
      {values.map((value, index) => (
        <Die key={index} value={value} />
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
      <DiceRow key={0} values={values.slice(0, 4)} />,
      <DiceRow key={1} values={values.slice(4, 8)} />,
    ];
  }

  return <div>{rows}</div>;
};

const DiceControl: FunctionComponent<{}> = () => {
  const roll = useAppSelector((state) => state.diceRolls.roll);
  const dispatch = useAppDispatch();
  const [numDice, setNumDice] = useState<number>(8);

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

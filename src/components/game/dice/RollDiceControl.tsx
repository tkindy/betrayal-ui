import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rollDice } from '../../../features/diceRolls';
import { RootState } from '../../../store';
import { BoundingBox, Dimensions } from '../../layout';
import zero from './zero.svg';
import one from './one.svg';
import two from './two.svg';

interface DieProps {
  value: number;
  dimensions: Dimensions;
}

const Die: FunctionComponent<DieProps> = ({
  value,
  dimensions: { width, height },
}) => {
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

  const padding = width * 0.05;
  const innerWidth = width - 2 * padding;
  const innerHeight = height - 2 * padding;

  return (
    <img
      src={src}
      className="dieValue"
      style={{ width: innerWidth, height: innerHeight, padding }}
    />
  );
};

interface DiceRowProps {
  values: number[];
  box: BoundingBox;
  dieDimensions: Dimensions;
}

const DiceRow: FunctionComponent<DiceRowProps> = ({
  values,
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
  dieDimensions,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      {values.map((value) => (
        <Die value={value} dimensions={dieDimensions} />
      ))}
    </div>
  );
};

interface DiceProps {
  values?: number[];
  dimensions: Dimensions;
}

const Dice: FunctionComponent<DiceProps> = ({
  values,
  dimensions: { width, height },
}) => {
  const dieDimensions: Dimensions = { width: width / 4, height: height / 2 };

  let rows;
  if (values) {
    rows = [
      <DiceRow
        values={values.slice(0, 4)}
        box={{
          topLeft: { x: 0, y: 0 },
          dimensions: { width, height: height / 2 },
        }}
        dieDimensions={dieDimensions}
      />,
      <DiceRow
        values={values.slice(4, 8)}
        box={{
          topLeft: { x: 0, y: height / 2 },
          dimensions: { width, height: height / 2 },
        }}
        dieDimensions={dieDimensions}
      />,
    ];
  }

  return <div>{rows}</div>;
};

interface RollDiceControlProps {
  dimensions: Dimensions;
}

const RollDiceControl: FunctionComponent<RollDiceControlProps> = ({
  dimensions: { width, height },
}) => {
  const roll = useSelector((state: RootState) => state.diceRolls.roll);
  const diceDimensions: Dimensions = { width, height: (5 * height) / 8 };
  const dispatch = useDispatch();
  const [numDice, setNumDice] = useState<number>(8);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: 5,
        }}
      >
        <input
          type="number"
          min="1"
          max="8"
          value={numDice}
          onChange={(e) => setNumDice(parseInt(e.target.value))}
          style={{ flex: '0 1 20%', minWidth: '0px' }}
        />
        <button
          onClick={() => dispatch(rollDice({ numDice }))}
          style={{ flex: '0 1 50%' }}
        >
          Roll
        </button>
      </div>

      <Dice values={roll} dimensions={diceDimensions} />
    </div>
  );
};

export default RollDiceControl;

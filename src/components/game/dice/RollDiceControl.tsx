import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rollDice } from '../../../features/diceRolls';
import { RootState } from '../../../store';
import { translate } from '../../geometry';
import { BoundingBox } from '../../layout';

interface DieProps {
  value: number;
}

const Die: FunctionComponent<DieProps> = ({ value }) => {
  return (
    <div className="dieValue" style={{ flex: 1, textAlign: 'center' }}>
      {value}
    </div>
  );
};

interface DiceRowProps {
  values: number[];
  box: BoundingBox;
}

const DiceRow: FunctionComponent<DiceRowProps> = ({
  values,
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {values.map((value) => (
        <Die value={value} />
      ))}
    </div>
  );
};

interface DiceProps {
  values?: number[];
  box: BoundingBox;
}

const Dice: FunctionComponent<DiceProps> = ({
  values,
  box: {
    topLeft,
    dimensions: { width, height },
  },
}) => {
  let rows;
  if (values) {
    rows = [
      <DiceRow
        values={values.slice(0, 4)}
        box={{
          topLeft: { x: 0, y: 0 },
          dimensions: { width, height: height / 2 },
        }}
      />,
      <DiceRow
        values={values.slice(4, 8)}
        box={{
          topLeft: { x: 0, y: height / 2 },
          dimensions: { width, height: height / 2 },
        }}
      />,
    ];
  }
  const { x, y } = topLeft;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        backgroundColor: 'white',
        borderRadius: '3px',
      }}
    >
      <div>{rows}</div>
    </div>
  );
};

interface RollDiceControlProps {
  box: BoundingBox;
}

const RollDiceControl: FunctionComponent<RollDiceControlProps> = ({
  box: {
    topLeft,
    dimensions: { width, height },
  },
}) => {
  const { x, y } = topLeft;
  const roll = useSelector((state: RootState) => state.diceRolls.roll);
  const diceBox: BoundingBox = {
    topLeft: translate(topLeft, 0, (3 * height) / 8),
    dimensions: { width, height: (5 * height) / 8 },
  };
  const dispatch = useDispatch();
  const [numDice, setNumDice] = useState<number>(8);

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width,
          height: height / 4,
          display: 'flex',
          justifyContent: 'space-around',
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

      <Dice values={roll} box={diceBox} />
    </div>
  );
};

export default RollDiceControl;

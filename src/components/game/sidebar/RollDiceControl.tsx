import React, { FunctionComponent } from 'react';
import { BoundingBox } from '../../layout';
import DOMPortal from '../portal/DOMPortal';

interface RollDiceControlProps {
  box: BoundingBox;
}

const RollDiceControl: FunctionComponent<RollDiceControlProps> = ({
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
}) => {
  return (
    <DOMPortal name="rollDiceControl">
      <button style={{ position: 'absolute', top: y, left: x, width, height }}>
        Roll dice
      </button>
    </DOMPortal>
  );
};

export default RollDiceControl;

import React, { FC } from 'react';
import die from '../../../assets/die.svg';
import { BoundingBox } from '../../layout';

interface DiceButtonProps {
  box: BoundingBox;
}

const DiceButton: FC<DiceButtonProps> = ({
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
}) => {
  const dieWidth = width / 2;
  const dieHeight = dieWidth;
  const dieLeft = width / 2 - dieWidth / 2;
  const dieTop = height / 2 - dieHeight / 2;

  return (
    <div
      id="test-circle"
      style={{
        backgroundColor: '#cc3716',
        borderRadius: '50%',
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        cursor: 'pointer',
      }}
    >
      <img
        src={die}
        style={{
          position: 'relative',
          left: dieLeft,
          top: dieTop,
          cursor: 'pointer',
        }}
        width={dieWidth}
        height={dieHeight}
      />
    </div>
  );
};

export default DiceButton;

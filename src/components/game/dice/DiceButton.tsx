import React, { FC } from 'react';
import die from '../../../assets/die.svg';
import xIcon from '../../../assets/x.svg';
import { BoundingBox } from '../../layout';

interface DiceButtonProps {
  box: BoundingBox;
  expanded: boolean;
  onClick: () => void;
}

const DiceButton: FC<DiceButtonProps> = ({
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
  expanded,
  onClick,
}) => {
  const dieWidth = width / 2;
  const dieHeight = dieWidth;
  const dieLeft = width / 2 - dieWidth / 2;
  const dieTop = height / 2 - dieHeight / 2;

  const [imgSrc, alt] = expanded
    ? [xIcon, 'dice roller close']
    : [die, 'dice roller open'];

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
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <img
        src={imgSrc}
        style={{
          position: 'relative',
          left: dieLeft,
          top: dieTop,
          cursor: 'pointer',
        }}
        width={dieWidth}
        height={dieHeight}
        onClick={onClick}
        alt={alt}
      />
    </div>
  );
};

export default DiceButton;

import React, { FC } from 'react';
import die from './two.svg';
import xIcon from './x.svg';
import './DiceButton.css';

interface DiceButtonProps {
  expanded: boolean;
  onClick: () => void;
}

const DiceButton: FC<DiceButtonProps> = ({ expanded, onClick }) => {
  const [imgSrc, alt] = expanded
    ? [xIcon, 'dice roller close']
    : [die, 'dice roller open'];

  return (
    <div className="dice-button-background" onClick={onClick}>
      <img
        className="dice-button-icon"
        src={imgSrc}
        onClick={onClick}
        alt={alt}
      />
    </div>
  );
};

export default DiceButton;

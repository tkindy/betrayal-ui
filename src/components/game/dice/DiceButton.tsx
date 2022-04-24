import React, { FC } from 'react';
import './DiceButton.css';

interface DiceButtonProps {
  expanded: boolean;
  onClick: () => void;
}

const DiceButton: FC<DiceButtonProps> = ({ expanded, onClick }) => {
  const [filename, alt] = expanded
    ? ['x', 'dice roller close']
    : ['dice/two', 'dice roller open'];

  return (
    <div className="dice-button-background" onClick={onClick}>
      <img
        className="dice-button-icon"
        src={`/images/${filename}.svg`}
        onClick={onClick}
        alt={alt}
      />
    </div>
  );
};

export default DiceButton;

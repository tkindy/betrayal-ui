import React, { FC } from 'react';
import die from '../../../assets/die.svg';

const DiceButton: FC<{}> = () => {
  return (
    <div
      id="test-circle"
      style={{
        backgroundColor: '#cc3716',
        borderRadius: '50%',
        margin: '10px',
        width: '60px',
        height: '60px',
        cursor: 'pointer',
      }}
    >
      <img
        src={die}
        style={{ position: 'relative', left: 15, top: 15, cursor: 'pointer' }}
        width="30px"
        height="30px"
      />
    </div>
  );
};

export default DiceButton;

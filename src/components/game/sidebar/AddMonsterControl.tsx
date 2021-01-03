import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { addMonster } from '../../../features/monsters';
import { BoundingBox } from '../../layout';
import DOMPortal from '../portal/DOMPortal';

interface AddMonsterControlProps {
  box: BoundingBox;
}

const AddMonsterControl: FunctionComponent<AddMonsterControlProps> = ({
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
}) => {
  const dispatch = useDispatch();

  return (
    <DOMPortal name="addMonsterControl">
      <button
        onClick={() => dispatch(addMonster())}
        style={{
          position: 'absolute',
          top: y + height / 4,
          left: x,
          width,
          height: height / 2,
        }}
      >
        Add monster
      </button>
    </DOMPortal>
  );
};

export default AddMonsterControl;

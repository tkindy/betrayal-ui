import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { addMonster } from '../../../features/monsters';

interface AddMonsterControlProps {}

const AddMonsterControl: FunctionComponent<AddMonsterControlProps> = () => {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(addMonster())}>Add monster</button>;
};

export default AddMonsterControl;

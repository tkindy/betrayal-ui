import { useState } from 'react';

export const useRender = () => {
  const [value, setValue] = useState(0);
  return () => {
    setValue(value + 1);
  };
};

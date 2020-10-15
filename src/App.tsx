import React, { useEffect, useState } from 'react';
import './App.css';
import { Layer, Rect, Stage } from 'react-konva';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

const App = () => {
  const { width, height } = useWindowDimensions();
  const inset = 1;

  return (
    <Stage width={width} height={height} draggable>
      <Layer>
        <Rect
          x={inset}
          y={inset}
          width={width - 2 * inset}
          height={height - 2 * inset}
          stroke="red"
        />
      </Layer>
    </Stage>
  );
};

export default App;

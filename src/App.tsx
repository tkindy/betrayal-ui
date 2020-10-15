import React, { useEffect, useState } from 'react';
import './App.css';
import { Layer, Stage } from 'react-konva';
import Room, { Direction } from './board/Room';

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

  return (
    <Stage width={width} height={height} draggable>
      <Layer>
        <Room
          loc={{ gridX: 4, gridY: 3 }}
          doorDirections={[
            Direction.SOUTH,
            Direction.EAST,
            Direction.NORTH,
            Direction.WEST,
          ]}
        />
        <Room
          loc={{ gridX: 3, gridY: 3 }}
          doorDirections={[Direction.EAST, Direction.SOUTH]}
        />
        <Room
          loc={{ gridX: 4, gridY: 4 }}
          doorDirections={[Direction.NORTH, Direction.SOUTH]}
        />
      </Layer>
    </Stage>
  );
};

export default App;

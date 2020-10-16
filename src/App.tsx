import React, { useEffect, useState } from 'react';
import './App.css';
import { Layer, Stage } from 'react-konva';
import { Direction } from './board/Room';
import Board from './board/Board';

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
        <Board
          rooms={[
            {
              name: 'Bloody Room',
              loc: { gridX: 2, gridY: 2 },
              doorDirections: [
                Direction.SOUTH,
                Direction.EAST,
                Direction.NORTH,
                Direction.WEST,
              ],
            },
            {
              name: 'Statuary Corridor',
              loc: { gridX: 1, gridY: 2 },
              doorDirections: [Direction.EAST, Direction.SOUTH],
            },
            {
              name: 'Master Bedroom',
              loc: { gridX: 2, gridY: 3 },
              doorDirections: [Direction.NORTH, Direction.SOUTH],
            },
            {
              name: 'Crypt',
              loc: { gridX: 2, gridY: 1 },
              doorDirections: [Direction.SOUTH],
            },
          ]}
        />
      </Layer>
    </Stage>
  );
};

export default App;

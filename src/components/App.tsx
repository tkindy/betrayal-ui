import React from 'react';
import './App.css';
import { Layer, Stage } from 'react-konva';
import { Direction } from './board/Room';
import Board from './board/Board';
import { PlayerColor } from './board/Players';
import Controls from './controls/Controls';
import { ReactReduxContext } from 'react-redux';
import RoomStack from './roomStack/RoomStack';
import { useWindowDimensions } from './windowDimensions';

const rooms = [
  {
    name: 'Bloody Room',
    loc: { gridX: 2, gridY: 2 },
    doorDirections: [
      Direction.SOUTH,
      Direction.EAST,
      Direction.NORTH,
      Direction.WEST,
    ],
    players: [],
  },
  {
    name: 'Statuary Corridor',
    loc: { gridX: 1, gridY: 2 },
    doorDirections: [Direction.EAST, Direction.SOUTH],
    players: [{ color: PlayerColor.BLUE }],
  },
  {
    name: 'Master Bedroom',
    loc: { gridX: 2, gridY: 3 },
    doorDirections: [Direction.NORTH, Direction.SOUTH],
    players: [],
  },
  {
    name: 'Crypt',
    loc: { gridX: 2, gridY: 1 },
    doorDirections: [Direction.SOUTH],
    players: [
      { color: PlayerColor.YELLOW },
      { color: PlayerColor.RED },
      { color: PlayerColor.GREEN },
      { color: PlayerColor.WHITE },
      { color: PlayerColor.PURPLE },
    ],
  },
];

const App = () => {
  const { width, height } = useWindowDimensions();

  return (
    <div>
      <Controls />
      <ReactReduxContext.Consumer>
        {(reduxContext) => (
          <Stage width={width} height={height}>
            <ReactReduxContext.Provider value={reduxContext}>
              <Layer draggable>
                <Board rooms={rooms} />
              </Layer>
              <Layer>
                <RoomStack />
              </Layer>
            </ReactReduxContext.Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

export default App;

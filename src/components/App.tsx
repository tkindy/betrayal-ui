import React from 'react';
import './App.css';
import { Layer, Rect, Stage } from 'react-konva';
import { Direction } from './board/BoardRoom';
import Board from './board/Board';
import { PlayerColor } from './board/Players';
import Controls from './controls/Controls';
import { ReactReduxContext } from 'react-redux';
import RoomStack from './roomStack/RoomStack';
import { useWindowDimensions } from './windowDimensions';
import { Floor } from '../features/roomStack';

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
                <Rect
                  x={-1000}
                  y={-1000}
                  width={width + 2000}
                  height={height + 2000}
                />
                <Board rooms={rooms} />
              </Layer>
              <Layer>
                <RoomStack
                  nextRoom={{
                    possibleFloors: [Floor.GROUND, Floor.ROOF],
                  }}
                />
              </Layer>
            </ReactReduxContext.Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

export default App;

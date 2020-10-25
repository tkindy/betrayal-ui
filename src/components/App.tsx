import React from 'react';
import './App.css';
import { Layer, Rect, Stage } from 'react-konva';
import Board from './board/Board';
import Controls from './controls/Controls';
import { ReactReduxContext } from 'react-redux';
import RoomStack from './roomStack/RoomStack';
import { useWindowDimensions } from './windowDimensions';
import { Floor } from '../features/roomStack';

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
                <Board />
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

import React from 'react';
import './App.css';
import { Layer, Rect, Stage } from 'react-konva';
import Board from './board/Board';
import Controls from './controls/Controls';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import RoomStack from './roomStack/RoomStack';
import { useWindowDimensions } from './windowDimensions';
import { moveBoard } from '../features/board';
import { RootState } from '../rootReducer';
import Players from './players/Players';

const App = () => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { x, y } = useSelector((state: RootState) => state.board.topLeft);

  return (
    <div>
      <Controls />
      <ReactReduxContext.Consumer>
        {(reduxContext) => (
          <Stage width={width} height={height}>
            <ReactReduxContext.Provider value={reduxContext}>
              <Layer
                draggable
                onDragEnd={(e) => {
                  dispatch(
                    moveBoard({
                      x: -e.target.x(),
                      y: -e.target.y(),
                    })
                  );
                }}
              >
                <Rect x={x} y={y} width={width} height={height} />
                <Board />
                <Players />
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

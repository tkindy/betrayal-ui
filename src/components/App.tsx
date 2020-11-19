import React from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import Board from './game/board/Board';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { useWindowDimensions } from './windowDimensions';
import { moveBoard } from '../features/board';
import { RootState } from '../store';
import Players from './game/players/Players';
import Sidebar from './game/sidebar/Sidebar';

const App = () => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { x, y } = useSelector((state: RootState) => state.board.topLeft);

  return (
    <div>
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
                <Group name="overlay" />
              </Layer>
              <Layer>
                <Sidebar />
              </Layer>
            </ReactReduxContext.Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

export default App;

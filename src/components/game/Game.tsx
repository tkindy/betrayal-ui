import React, { FC } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import Board from './board/Board';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { useWindowDimensions } from '../windowDimensions';
import { moveBoard } from '../../features/board';
import { RootState } from '../../store';
import Players from './players/Players';
import Sidebar from './sidebar/Sidebar';
import { RouteComponentProps } from '@reach/router';

interface GameProps extends RouteComponentProps {
  gameId?: string;
}

const Game: FC<GameProps> = () => {
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

export default Game;

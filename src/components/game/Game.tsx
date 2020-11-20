import React, { FC, useEffect } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import Board from './board/Board';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { useWindowDimensions } from '../windowDimensions';
import { getRooms, moveBoard } from '../../features/board';
import { RootState } from '../../store';
import Players from './players/Players';
import Sidebar from './sidebar/Sidebar';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { joinGame } from '../../features/game';
import { getPlayers } from '../../features/players';
import { getStackRoom } from '../../features/roomStack';

interface GameProps extends RouteComponentProps {
  gameCode?: string;
}

const Game: FC<GameProps> = ({ gameCode }) => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { x, y } = useSelector((state: RootState) => state.board.topLeft);

  useEffect(() => {
    if (!gameCode) {
      navigate('/');
      return;
    }

    dispatch(joinGame(gameCode));
    dispatch(getRooms());
    dispatch(getPlayers());
    dispatch(getStackRoom());
  }, [gameCode, dispatch, navigate]);

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

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
import { getRoomStack } from '../../features/roomStack';
import DrawnCard from './DrawnCard';
import { getDrawnCard } from '../../features/cardStacks';

interface GameProps extends RouteComponentProps {
  gameId?: string;
}

const Game: FC<GameProps> = ({ gameId }) => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { x, y } = useSelector((state: RootState) => state.board.topLeft);

  useEffect(() => {
    if (!gameId || !/^[A-Z]{6}$/.test(gameId)) {
      navigate('/');
      return;
    }

    dispatch(joinGame(gameId));
    dispatch(getRooms());
    dispatch(getPlayers());
    dispatch(getRoomStack());
    dispatch(getDrawnCard());
  }, [gameId, dispatch, navigate]);

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
      <DrawnCard />
    </div>
  );
};

export default Game;

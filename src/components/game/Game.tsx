import { FC, useEffect } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import Board from './board/Board';
import { ReactReduxContext } from 'react-redux';
import { useWindowDimensions } from '../windowDimensions';
import { moveBoard } from '../../features/board';
import Agents from './players/Agents';
import Sidebar from './sidebar/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import DrawnCard from './cards/DrawnCard';
import CharacterBar from './character/CharacterBar';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { joinGame, receiveGameMessage } from '../../features/actions';
import { connectToWebSocket } from '../webSocket';
import { AppDispatch } from '../../store';
import { useSend } from '../hooks';

const buildWebsocketUrl = (gameId: string) => {
  const httpRoot = process.env.REACT_APP_API_ROOT!!;
  const wsRoot = httpRoot.replace(/^http/, 'ws');
  return `${wsRoot}/games/${gameId}`;
};

const connectToGame = (gameId: string, dispatch: AppDispatch) => {
  return connectToWebSocket(
    buildWebsocketUrl(gameId),
    dispatch,
    receiveGameMessage
  );
};

const Game: FC<{}> = () => {
  const { gameId } = useParams();
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { x, y } = useAppSelector((state) => state.board.topLeft);
  const [send, setSend] = useSend();

  useEffect(() => {
    if (!gameId || !/^[A-Z]{6}$/.test(gameId)) {
      navigate('/');
      return;
    }

    dispatch(joinGame({ gameId }));
    const { send, close } = connectToGame(gameId, dispatch);
    setSend(send);

    return () => {
      setSend();
      close();
    };
  }, [gameId, dispatch, navigate, setSend]);

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
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
                <Agents />
                <Group name="overlay" />
              </Layer>
            </ReactReduxContext.Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      <Sidebar />
      <CharacterBar />
      <DrawnCard />
    </div>
  );
};

export default Game;

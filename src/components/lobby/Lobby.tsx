import { connect, disconnect, send } from '@giantmachines/redux-websocket/dist';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { joinLobby } from '../../features/lobby';
import { LobbyPlayer } from '../../features/models';
import { useAppDispatch, useAppSelector } from '../../hooks';

const buildWebsocketUrl = (lobbyId: string) => {
  const httpRoot = process.env.REACT_APP_API_ROOT!!;
  const wsRoot = httpRoot.replace(/^http/, 'ws');
  return `${wsRoot}/lobbies/${lobbyId}`;
};

const PlayerList: FC<{ players?: LobbyPlayer[] }> = ({ players }) => {
  if (!players) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="lobby-players">
      {players.map((player) => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  );
};

const Lobby: FC<{}> = () => {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.lobby.players);
  const name = useAppSelector((state) => state.lobby.name);

  useEffect(() => {
    if (!lobbyId || !/^[A-Z]{6}$/.test(lobbyId)) {
      navigate('/');
      return;
    }

    dispatch(joinLobby(lobbyId));
    dispatch(connect(buildWebsocketUrl(lobbyId)));
    dispatch(send({ name }));

    return () => {
      dispatch(disconnect());
    };
  }, [lobbyId, name, dispatch, navigate]);

  return (
    <div className="lobby-wrapper">
      <PlayerList players={players} />
    </div>
  );
};

export default Lobby;

import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { joinLobby, receiveLobbyMessage } from '../../features/lobby';
import { LobbyPlayer } from '../../features/models';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppDispatch } from '../../store';

const buildWebsocketUrl = (lobbyId: string) => {
  const httpRoot = process.env.REACT_APP_API_ROOT!!;
  const wsRoot = httpRoot.replace(/^http/, 'ws');
  return `${wsRoot}/lobbies/${lobbyId}`;
};

const PlayerList: FC<{ players?: string[] }> = ({ players }) => {
  if (!players) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="lobby-players">
      {players.map((player) => (
        <li key={player}>{player}</li>
      ))}
    </ul>
  );
};

const connectToLobby = (
  lobbyId: string,
  name: string,
  dispatch: AppDispatch
) => {
  let webSocket = new WebSocket(buildWebsocketUrl(lobbyId));
  webSocket.onopen = () => {
    webSocket.send(JSON.stringify({ name }));
  };
  webSocket.onmessage = (event) => {
    dispatch(receiveLobbyMessage(JSON.parse(event.data)));
  };

  return () => {
    webSocket.close();
  };
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
    if (!name) {
      console.error('No name in store');
      return;
    }

    dispatch(joinLobby(lobbyId));
    return connectToLobby(lobbyId, name, dispatch);
  }, [lobbyId, name, dispatch, navigate]);

  return (
    <div className="lobby-wrapper">
      <PlayerList players={players} />
    </div>
  );
};

export default Lobby;

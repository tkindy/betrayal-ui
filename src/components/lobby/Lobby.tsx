import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { joinLobby, receiveLobbyMessage } from '../../features/lobby';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.lobby.players);
  const name = useAppSelector((state) => state.lobby.name);
  const [newName, setNewName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

  useEffect(() => {
    if (!lobbyId || !/^[A-Z]{6}$/.test(lobbyId)) {
      navigate('/');
      return;
    }

    // Join if we're the host, or rejoin if we were previously in this lobby
    let nameToUse = name || null;

    const nameParam = searchParams.get('name');
    if (nameParam) {
      nameToUse = nameToUse || nameParam;
      setSearchParams({});
    }

    if (process.env.NODE_ENV === 'production') {
      nameToUse = nameToUse || localStorage.getItem(lobbyId);
    }

    if (nameSubmitted) {
      nameToUse = nameToUse || newName;
      setNameSubmitted(false);
    }

    if (!nameToUse) {
      return;
    }

    dispatch(joinLobby(lobbyId, nameToUse));
    return connectToLobby(lobbyId, nameToUse, dispatch);
  }, [
    lobbyId,
    name,
    nameSubmitted,
    setNameSubmitted,
    newName,
    dispatch,
    navigate,
    searchParams,
    setSearchParams,
  ]);

  return (
    <div className="lobby-wrapper">
      {name ? (
        <PlayerList players={players} />
      ) : (
        <div>
          <p>Enter your name</p>
          <input
            type="text"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setNameSubmitted(true);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Lobby;

import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { receiveLobbyMessage } from '../../features/actions';
import { setName } from '../../features/lobby';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppDispatch } from '../../store';

type Send = (data: any) => void;

const buildWebsocketUrl = (lobbyId: string) => {
  const httpRoot = process.env.REACT_APP_API_ROOT!!;
  const wsRoot = httpRoot.replace(/^http/, 'ws');
  return `${wsRoot}/lobbies/${lobbyId}`;
};

const NameForm: FC<{
  submitName: (name: string) => void;
}> = ({ submitName }) => {
  const [name, setName] = useState('');

  return (
    <div>
      <p>Enter your name</p>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          submitName(name);
        }}
      >
        Submit
      </button>
    </div>
  );
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

const InLobby: FC<{ send?: Send }> = ({ send }) => {
  const players = useAppSelector((state) => state.lobby.players);
  const isHost = useAppSelector((state) => state.lobby.isHost);

  return (
    <>
      <PlayerList players={players} />
      {isHost && (
        <button onClick={() => send!({ type: 'start-game' })}>
          Start game
        </button>
      )}
    </>
  );
};

const connectToWebSocket = <M,>(
  url: string,
  dispatch: AppDispatch,
  messageActionCreator: (message: M) => Parameters<AppDispatch>[0],
  onOpen: (webSocket: WebSocket, e: Event) => void = () => {}
) => {
  let webSocket = new WebSocket(url);
  webSocket.onopen = (e) => {
    onOpen(webSocket, e);
  };
  webSocket.onmessage = (event) => {
    dispatch(messageActionCreator(JSON.parse(event.data)));
  };

  return {
    close: () => webSocket.close(),
    send: (data: any) => webSocket.send(JSON.stringify(data)),
  };
};

const connectToLobby = (
  lobbyId: string,
  name: string,
  dispatch: AppDispatch
) => {
  return connectToWebSocket(
    buildWebsocketUrl(lobbyId),
    dispatch,
    receiveLobbyMessage,
    (webSocket) => {
      webSocket.send(JSON.stringify({ name }));
    }
  );
};

const isLobbyId = (lobbyId: string | undefined): lobbyId is string => {
  if (!lobbyId) {
    return false;
  }
  return /^[A-Z]{6}$/.test(lobbyId);
};

const Lobby: FC<{}> = () => {
  const { lobbyId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.lobby.name);
  const [newName, setNewName] = useState<string | null>(null);
  const [wrappedSend, setWrappedSend] = useState<{ send: Send } | null>(null);
  const gameStarted = useAppSelector((state) => state.lobby.gameStarted);

  useEffect(() => {
    if (!isLobbyId(lobbyId)) {
      navigate('/');
      return;
    }
    if (name) {
      return;
    }

    let nameToUse: string | null = null;
    let isHost = false;

    const nameParam = searchParams.get('name');
    if (nameParam) {
      nameToUse = nameToUse || nameParam;
      setSearchParams({});
      isHost = true;
    }

    if (process.env.NODE_ENV === 'production') {
      nameToUse = nameToUse || localStorage.getItem(lobbyId);
    }

    if (newName !== null) {
      nameToUse = nameToUse || newName;
      setNewName(null);
    }

    if (nameToUse) {
      dispatch(setName(lobbyId, nameToUse, isHost));
    }
  }, [
    lobbyId,
    name,
    newName,
    setNewName,
    dispatch,
    navigate,
    searchParams,
    setSearchParams,
  ]);
  useEffect(() => {
    if (!isLobbyId(lobbyId)) {
      navigate('/');
      return;
    }

    if (name) {
      const { send, close } = connectToLobby(lobbyId, name, dispatch);
      setWrappedSend({ send });
      return () => {
        setWrappedSend(null);
        close();
      };
    }
  }, [lobbyId, name, dispatch, navigate, setWrappedSend]);
  useEffect(() => {
    if (gameStarted) {
      navigate(`/game/${lobbyId}`);
    }
  }, [gameStarted, navigate, lobbyId]);

  return (
    <div className="lobby-wrapper">
      {name ? (
        <InLobby send={wrappedSend?.send} />
      ) : (
        <NameForm submitName={setNewName} />
      )}
    </div>
  );
};

export default Lobby;

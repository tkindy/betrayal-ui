import './Home.css';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLobby } from '../api/api';

const Home: FC<{}> = () => {
  const navigate = useNavigate();
  const [hostName, setHostName] = useState('');
  const [gameId, setGameId] = useState('');

  const handleJoin = () => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <h1>Betrayal at House on the Hill</h1>
      <div className="container">
        <input
          className="host-name"
          form="new-game-form"
          placeholder="Your name"
          required
          type="text"
          minLength={1}
          maxLength={20}
          onChange={(e) => {
            setHostName(e.target.value);
          }}
        />
        <button className="new-game" form="new-game-form">
          New game
        </button>
        <form
          id="new-game-form"
          onSubmit={async (e) => {
            e.preventDefault();

            const lobbyId = await createLobby(hostName);
            navigate(`/lobby/${lobbyId}?name=${encodeURIComponent(hostName)}`);
          }}
        />

        <input
          className="join-game"
          form="join-game-form"
          placeholder="Game ID"
          required
          pattern="[A-Z]{6}"
          value={gameId}
          onChange={(e) => {
            const { value } = e.target;
            const cleaned = value
              .toUpperCase()
              .replace(/[^A-Z]/g, '')
              .substring(0, 6);
            setGameId(cleaned);
          }}
        />
        <button className="join-game" form="join-game-form">
          Join game
        </button>
        <form
          id="join-game-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleJoin();
          }}
        />
      </div>
    </div>
  );
};

export default Home;

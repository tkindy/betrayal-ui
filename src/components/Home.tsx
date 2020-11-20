import './Home.css';
import React, { FC, useState } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { createGame } from '../api/api';

interface HomeProps extends RouteComponentProps {}

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState('');

  const handleJoin = () => {
    navigate(`/game/${gameCode}`);
  };

  return (
    <div>
      <h1>Betrayal at House on the Hill</h1>
      <div className="container">
        <button
          className="new-game"
          onClick={async () => {
            const gameCode = await createGame();
            navigate(`/game/${gameCode}`);
          }}
        >
          New game
        </button>

        <input
          className="join-game"
          placeholder="Game code"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleJoin();
            }
          }}
        />
        <button className="join-game" onClick={handleJoin}>
          Join game
        </button>
      </div>
    </div>
  );
};

export default Home;

import './Home.css';
import React, { FC, useState } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { createGame } from '../api/api';

interface HomeProps extends RouteComponentProps {}

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');

  const handleJoin = () => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <h1>Betrayal at House on the Hill</h1>
      <div className="container">
        <button
          className="new-game"
          onClick={async () => {
            const gameId = await createGame();
            navigate(`/game/${gameId}`);
          }}
        >
          New game
        </button>

        <input
          className="join-game"
          form="join-game-form"
          placeholder="Game ID"
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

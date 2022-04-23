import './Home.css';
import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../api/api';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');
  const numPlayersRef = useRef<HTMLInputElement>(null);

  const handleJoin = () => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <h1>Betrayal at House on the Hill</h1>
      <div className="container">
        <input
          className="num-players"
          form="new-game-form"
          placeholder="Number of players"
          required
          type="number"
          min="3"
          max="6"
          ref={numPlayersRef}
        />
        <button className="new-game" form="new-game-form">
          New game
        </button>
        <form
          id="new-game-form"
          onSubmit={async (e) => {
            e.preventDefault();

            const gameId = await createGame(
              parseInt(numPlayersRef.current!!.value)
            );
            navigate(`/game/${gameId}`);
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

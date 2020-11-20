import './Home.css';
import { RouteComponentProps } from '@reach/router';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGame, joinGame } from '../features/game';

interface HomeProps extends RouteComponentProps {}

const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const [gameCode, setGameCode] = useState('');

  const handleJoin = () => {
    dispatch(joinGame(gameCode));
  };

  return (
    <div>
      <h1>Betrayal at House on the Hill</h1>
      <div className="container">
        <button className="new-game" onClick={() => dispatch(createGame())}>
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

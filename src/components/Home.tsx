import './Home.css';
import { RouteComponentProps } from '@reach/router';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

interface HomeProps extends RouteComponentProps {}

const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Betrayal at House on the Hill</h1>
      <div className="container">
        <button className="new-game">New game</button>

        <input className="join-game" />
        <button className="join-game">Join game</button>
      </div>
    </div>
  );
};

export default Home;

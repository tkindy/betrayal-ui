import { Router } from '@reach/router';
import React from 'react';
import Game from './game/Game';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <Game path="/game/:gameId" />
    </Router>
  );
};

export default App;

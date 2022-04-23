import { Route, Routes } from 'react-router';
import Game from './game/Game';
import Home from './Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:gameId" element={<Game />} />
    </Routes>
  );
};

export default App;

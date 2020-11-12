import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { getRooms } from './features/board';
import { getStackRoom } from './features/roomStack';
import { getPlayers } from './features/players';
import { useStrictMode } from 'react-konva';

useStrictMode(true);

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(getRooms());
store.dispatch(getPlayers());
store.dispatch(getStackRoom());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

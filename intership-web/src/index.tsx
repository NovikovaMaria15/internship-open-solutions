import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './normalize.css';
import './index.css';
import './variables.scss';
import { App } from './App';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.querySelector('#root'),
);

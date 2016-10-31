import React from 'react';
import ReactDOM from 'react-dom';

//redux
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

//auth
import { initAuth } from './redux/auth';

import App from './App';
import './index.css';

const store = configureStore();

function render(Routes) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

initAuth(store.dispatch)
  .then(() => render(App))
  .catch(error => console.error(error)); // eslint-disable-line no-console

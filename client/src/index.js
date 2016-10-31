import React from 'react';
import ReactDOM from 'react-dom';

//redux
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

//auth
import { initAuth } from './redux/auth';

import Routes from './Routes';
import './index.css';

const store = configureStore();

function render(Routes) {
  ReactDOM.render(
    <Provider store={store}>
      <Routes store={store}/>
    </Provider>,
    document.getElementById('root')
  );
}

initAuth(store.dispatch)
  .then(() => render(Routes))
  .catch(error => console.error(error)); // eslint-disable-line no-console

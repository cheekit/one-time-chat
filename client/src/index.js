import React from 'react';
import ReactDOM from 'react-dom';

//redux
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

//auth
import { initAuth } from './redux/auth';

//material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import './index.css';

// Some components use react-tap-event-plugin to listen for touch events because
// onClick is not fast enough This dependency is temporary and will eventually go away.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  '-webkit-font-smoothing': 'antialiased',
  fontWeight: 300,
  palette: {
    primary1Color: '#333',
    accent1Color: '#7cb342',
  }
});

function render(Routes) {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
}

initAuth(store.dispatch)
  .then(() => render(App))
  .catch(error => console.error(error)); // eslint-disable-line no-console

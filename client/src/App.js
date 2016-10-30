import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';
import { Root, Sample } from './containers';
import './App.css';

class App extends Component {
  render() {
    const routes = [
      {
        pattern: '/',
        content: () => <Root />,
        sidebar: () => null,
        exactly: true,
      },
      {
        pattern: '/sample',
        content: () => <Sample />,
        sidebar: () => null,
        exactly: false,
      },
    ];

    return (
      <BrowserRouter>
        <div className="application_wrapper">
          <noscript></noscript>
          <div className="application_content">
            <section className="search">
              <div className="search_content">
                <div className="search_inner_content">
                  {routes.map((route, index) => (
                    <Match
                      key={index}
                      pattern={route.pattern}
                      component={route.content}
                      exactly={route.exactly}
                    />
                  ))}
                </div>
              </div>
              <div className="search_sidebar">
              </div>
            </section>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

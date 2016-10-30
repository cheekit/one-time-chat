import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import { Root, Sample, ChatSidebar, ChatToolbar } from './containers';
import { NotFound } from './components';
import './App.css';

class App extends Component {
  render() {
    const routes = [
      {
        pattern: '/',
        content: () => <Root />,
        sidebar: () => <ChatSidebar />,
        toolbar: () => <ChatToolbar />,
        exactly: true,
      },
      {
        pattern: '/sample',
        content: () => <Sample />,
        sidebar: () => null,
        toolbar: () => null,
        exactly: false,
      },
    ];

    return (
      <BrowserRouter>
        <div className="application_wrapper">
          <noscript></noscript>
          <div className="application_header">
            {routes.map((route, index) => (
              <Match
                key={index}
                pattern={route.pattern}
                component={route.toolbar}
                exactly={route.exactly}
              />
            ))}
          </div>
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
                  <Miss component={NotFound} />
                </div>
              </div>
              <div className="search_sidebar">
                {routes.map((route, index) => (
                  <Match
                    key={index}
                    pattern={route.pattern}
                    component={route.sidebar}
                    exactly={route.exactly}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

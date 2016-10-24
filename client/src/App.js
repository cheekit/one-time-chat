import React, { Component } from 'react';
import { BrowserRouter, Match, Redirect } from 'react-router';
import Sample, { samplePattern } from './containers/sample';
import Root, { rootPattern } from './containers/root';
import './App.css';

class App extends Component {
  state = {
    height: document.documentElement.clientHeight,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = this.handleResize.bind(this);

  handleResize() {
    this.setState({
      height: document.documentElement.clientHeight,
    });
  }

  render() {
    const { height } = this.state;

    const routes = [
      {
        pattern: rootPattern,
        content: () => <Root height={height} />,
        sidebar: () => null,
        isExact: () => true,
      },
      {
        pattern: samplePattern,
        content: () => <Sample height={height} />,
        sidebar: () => null,
      },
    ];

    return (
      <BrowserRouter>
        <div className="application_wrapper">
          <noscript></noscript>
            <Match exactly pattern={'/'} render={() => (
              <Redirect to={{ pathname: '/root' }}/>
            )}/>
          <div className="application_content">
            <section className="search">
              <div className="search_content" style={{ height }}>
                <div className="search_inner_content" style={{ height }}>
                  {routes.map((route, index) => (
                    <Match
                      key={index}
                      pattern={route.pattern}
                      component={route.content}
                      isExact={route.isExact}
                    />
                  ))}
                </div>
              </div>
              <div className="search_sidebar" style={{ height }}>
              </div>
            </section>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

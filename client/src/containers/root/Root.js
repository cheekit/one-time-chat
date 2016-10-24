import React, { PropTypes } from 'react';
import SizeMe from 'react-sizeme';

import logo from '../../logo.svg';
import './root.css';


const propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

function Root() {
  return (
    <div className="Root">
      <div className="Root-header">
        <img src={logo} className="Root-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="Root-intro">
        To get started, edit <code>src/Root.js</code> and save to reload.
      </p>
    </div>
  );
}

Root.propTypes = propTypes;

export default SizeMe()(Root);

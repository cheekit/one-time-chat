import React, { PropTypes } from 'react';

import './Toolbar.css';

const propTypes = {
  children: PropTypes.node,
};

function Toolbar({ children }) {
  return (
    <div className="toolbar">
      <div className="toolbar_list">
        <ul className="toolbar_controls">
          {children}
        </ul>
      </div>
    </div>
  );
}

Toolbar.propTypes = propTypes;

export default Toolbar;

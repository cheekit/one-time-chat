import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  label: PropTypes.string,
  pattern: PropTypes.string,
  icon: PropTypes.node,
};

function RouteControl({ label, pattern, icon }) {
  return (
    <li className="single_toolbar_control">
      <Link to={pattern} className="button button_dark_blue">
        <i>
          {icon}
        </i>
        <span />
        <span className="button_label insights">
          {label}
        </span>
      </Link>
    </li>
  );
}

RouteControl.propTypes = propTypes;

export default RouteControl;

import React, { PropTypes } from 'react';
import SizeMe from 'react-sizeme';

import './sample.css';


const propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

function Sample() {

  return (
    <div className="Sample">
      <div className="Sample-header">
        <h2>Sample</h2>
      </div>
    </div>
  );
}

Sample.propTypes = propTypes;

export default SizeMe()(Sample);

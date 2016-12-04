import React from 'react';
import { RouteControl } from '../../../components/controls';
import { logo } from '../../../components/icons';

function HomeControl() {
  return <RouteControl icon={logo} label={''} pattern={'/'} />;
}

export default HomeControl;

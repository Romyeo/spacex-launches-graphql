import React from 'react';

import logo from './logo.svg';

export default function Logo(props) {
  return <img style={{ width: props.width }} src={logo} className="logo" alt="SpaceX's logo" />;
}
import React from 'react';

import Logo from '../Logo/Logo';

import './Header.css';

export default function Header(props) {
  return (
    <header>
      <Logo width="100%" />
      <h1>{props.title}</h1>
    </header>
  )
}
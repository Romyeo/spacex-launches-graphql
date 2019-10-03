import React from 'react';

export default function ColorizedErrorText(props) {
  const { color, children } = props;
  return (
    <span style={{ color }}>
      {children}
    </span>
  );
}
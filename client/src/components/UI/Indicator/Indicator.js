import React from 'react';

export default function Indicator(props) {
  const { size, color } = props;

  const style = {
    backgroundColor: color,
    borderRadius: '100%',
    height: size,
    width: size,
  };

  return <div style={style} />;
}
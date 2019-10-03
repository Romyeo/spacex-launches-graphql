import React from 'react';

import './Card.css';

export default function Card(props) {
  const { header, content, footerLeft, footerRight, option } = props;

  return (
    <div className="card">
      {
        (header || option) && (
          <div className="card-header">
            {header && <h1>{header}</h1>}
            {option}
          </div>
        )
      }

      <div className="card-content">
        {content}
      </div>

      {
        (footerLeft || footerRight) && (
          <div className="card-footer">
            {
              true && (
                <div className="card-footer-left">{footerLeft}</div>
              )
            }
            {
              true && (
                <div className="card-footer-right">{footerRight}</div>
              )
            }
          </div>
        )
      }
    </div>
  );
}
import React from 'react';
import './Panel.css';

const Panel = ({ title }) => {
  return (
    <div className="panel-content">
      <h3 className="panel-title">{title}</h3>
    </div>
  );
};

export default Panel;

import React from 'react';
import './index.scss';

const Loader = ({ className }) => {
  const loadingText =
    className === 'loader-small' ? '' : 'Loading...';

  return (
    <div className={`loader ${className}`}>
      <div className="loader-text">{loadingText}</div>
      <div
        data-testid="loader"
        className="loader-sector loader-sector-green"
      />
      <div className="loader-sector loader-sector-grey" />
      <div className="loader-sector loader-sector-dark-grey" />
    </div>
  );
};

export default Loader;

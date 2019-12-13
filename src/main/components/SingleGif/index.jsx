import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const SingleGif = ({ imgSrc, title, id, history = {} }) => {
  return (
    <Link
      className="w-1/4 border h-64 m-4 cursor-pointer"
      to={`/${id}`}
    >
      <img
        src={imgSrc}
        alt={title}
        id={id}
        className="h-64 w-full object-cover"
      />
    </Link>
  );
};

export default withRouter(SingleGif);

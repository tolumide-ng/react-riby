import React from 'react';

const Button = ({ classes, role, title, ...rest }) => {
  return (
    <button
      data-testid="buttonComponent"
      type={role}
      className={classes}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;

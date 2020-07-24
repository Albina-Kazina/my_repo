import React from 'react';
import cn from 'classnames';

import './button.scss';
const block = 'button';

export default function Button({
  color,
  text,
  className,
  onClick = () => {},
  id,
  ...props
}) {
  const classes = cn(
    block,
    { [`${block}--color-${color}`]: !!color },
    className,
  );

  return (
    <button
      type="button"
      {...props}
      className={classes}
      onClick={onClick}
      id ={id}
    >
      {text}
    </button>
  );
}

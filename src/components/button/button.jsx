import React from 'react';
import './button.scss';

const block = 'button';

export default function Button({
  text,
  onClick = () => { },
  ...props
}) {
  return (
    <button
      className={block}
      type="button"
      onClick={onClick}
      {...props}
    >
      {text || props.children}
    </button>
  );
}

import * as React from 'react';

const classes = require('./Button.css');

interface Props extends React.Props<any> {
  disabled?: boolean,
  btnType: string,
  onClick: () => void
}

const Button = (props: Props) => {
  return (
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.onClick}>{props.children}</button>
  );
};

export default Button;
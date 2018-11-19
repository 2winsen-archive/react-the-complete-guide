import * as React from 'react';

const classes = require('./Backdrop.css');

interface Props extends React.Props<any> {
  show: boolean,
  onClick: () => void
}

const Backdrop = (props: Props) => {
  return props.show ?
    (<div
      className={classes.Backdrop}
      onClick={props.onClick} />) : null;
};

export default Backdrop;
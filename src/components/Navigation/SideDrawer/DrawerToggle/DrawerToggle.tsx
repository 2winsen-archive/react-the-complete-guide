import * as React from 'react';

const classes = require('./DrawerToggle.css');

interface Props extends React.Props<any> {
  onClick: () => void
}

const DrawerToggle = (props: Props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.onClick}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default DrawerToggle;
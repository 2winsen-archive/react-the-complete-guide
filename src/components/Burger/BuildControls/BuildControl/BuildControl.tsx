import * as React from 'react';

const classes = require('./BuildControl.css');

interface Props extends React.Props<any> {
  onMoreClick: () => void,
  onLessClick: () => void,
  disabled: boolean,
  label: string
}

const BuildControl = (props: Props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.onLessClick}
        disabled={props.disabled}>Less</button>
      <button
        className={classes.More}
        onClick={props.onMoreClick}>More</button>
    </div>
  );
};

export default BuildControl;
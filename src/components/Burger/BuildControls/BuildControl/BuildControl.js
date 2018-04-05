import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';

const BuildControl = props => {
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

BuildControl.propTypes = {
  onMoreClick: PropTypes.func,
  onLessClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default BuildControl;
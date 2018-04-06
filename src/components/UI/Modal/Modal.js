import React from 'react';

import classes from './Modal.css';
import Fragment from '../../../hoc/Fragment';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show} onClick={props.onClickedOutside} />
      <div className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Fragment>
  );
};

export default Modal;
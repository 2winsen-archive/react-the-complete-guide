import * as React from 'react';

import Fragment from '../../../hoc/Fragment/Fragment';
import Backdrop from '../Backdrop/Backdrop';

const classes = require('./Modal.css');

interface Props extends React.Props<any> {
  show: boolean,
  onClickedOutside: () => void
}

class Modal extends React.Component<Props> {
  public shouldComponentUpdate(nextProps: Props) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  public render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} onClick={this.props.onClickedOutside} />
        <div className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
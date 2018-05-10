import React from 'react';

import Fragment from '../../hoc/Fragment';
import Toolbal from '../Navigation/Toolbar/Toolbar';

import classes from './Layout.css';

const layout = (props) => (
  <Fragment>
    <Toolbal />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;
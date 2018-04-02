import React from 'react';
import Fragment from '../../hoc/Fragment';

const layout = (props) => (
  <Fragment>
    <div>
      Toolbar,
      SideDrawer,
      Backdrop
  </div>
    <main>
      {props.children}
    </main>
  </Fragment>
);

export default layout;
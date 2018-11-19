import * as React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';

const classes = require('./Logo.css');

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default Logo;
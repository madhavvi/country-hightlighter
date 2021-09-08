import { Grid } from '@material-ui/core';
import React from 'react';
import './Header.css';
import logo from '../../Assets/logo-white.svg';

function Header() {
  return (
    <Grid className="Header" item xs={12} md={12} lg={12}>
        <Grid className="img-block" item xs={12} md={12} lg={12} >
            <img className="img-logo" src={logo} alt="Utopia" />
        </Grid>
        <Grid className="title-block" item xs={12} md={12} lg={12}>
            <span className="page-title">Utopia Country Highlighter</span>
        </Grid>
    </Grid>
  );
}

export default Header;
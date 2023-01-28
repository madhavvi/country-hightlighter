import React from 'react';
import { Grid } from '@material-ui/core';
import './Header.css';

function Header() {
  return (
    <Grid className="Header" item xs={12} md={12} lg={12}>
        <Grid className="title-block" item xs={12} md={12} lg={12}>
            <span className="page-title">Country Highlighter</span>
        </Grid>
    </Grid>
  );
}

export default Header;
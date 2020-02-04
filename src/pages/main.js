import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Home from "../pages/screens/Home"
import {isAuthenticated, login} from './auth/auth'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#f7f7f7"
  },
}));

export default function StickyFooter() {
  const classes = useStyles();
  if (!isAuthenticated) {
    login();
  }
  return (
    <div className={classes.root}>
      <Home/>
    </div>
  );
}
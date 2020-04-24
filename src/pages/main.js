import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Home from "../pages/screens/Home";
import { isAuthenticated } from "./auth/auth";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: "#f7f7f7"
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* {isAuthenticated() ? <Home /> : <Redirect to="/sign-in" />} */}
      <Home />
    </div>
  );
}

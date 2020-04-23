import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";


import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { Redirect } from "react-router-dom";
import MenuBar from "./pages/components/MenuBar";
import SidePanel from "./pages/components/SidePanel";
import Alert from "./pages/components/Alert";
import RemindPassword from "./pages/auth/RemindPassword";
import RefreshPassword from "./pages/auth/RefreshPassword";
import EmailVerify from "./pages/auth/EmailVerify";
import { isAuthenticated } from "./pages/auth/auth";
import Home from "./pages/main";
import AdminWords from "./pages/adminPanel/words/words";
import AdminGroups from "./pages/adminPanel/groups";
import User from "./pages/user";
import Tests from "./pages/Tests";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { getUserData } from "./pages/auth/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="#">
        LernWords
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh)",
    paddingTop: "64px"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

function App(props) {
  const classes = useStyles();
  props.setUserData(getUserData());
  return (
    <Router>
      <MenuBar />
      <div className={classes.root}>
      <Alert />
        <SidePanel />
        <Switch>
          <Route path="/remind-password">
            <RemindPassword />
          </Route>
          <Route path="/refresh-password/:token">
            <RefreshPassword />
          </Route>
          <Route path="/email-verify/:token">
            <EmailVerify />
          </Route>
          <Route path="/sign-in" >
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/tests/:group">
            {isAuthenticated() ? <Tests /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="/admin-panel/words">
            {isAuthenticated() ? <AdminWords /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="/admin-panel/groups">
            {isAuthenticated() ? <AdminGroups /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="/user">
            {isAuthenticated() ? <User /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="/">
            {isAuthenticated() ? <Home /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
            <Copyright />
          </Container>
        </footer>
      </div>
    </Router>
  );
}
const mapState = state => {
  return {
    count: state.count
  };
};

const mapDispatch = ({
  count: { addBy, addByAsync, remove, removeAsync },
  userData: { setUserData }
}) => ({
  addByOne: () => addBy(1),
  addByOneAsync: () => addByAsync(1),
  removeOne: () => remove(),
  removeOneAsync: () => removeAsync(),
  setUserData: data => setUserData(data)
});
export default connect(mapState, mapDispatch)(App);

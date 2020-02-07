import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/main";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import MenuBar from "./pages/components/MenuBar";
import SidePanel from "./pages/components/SidePanel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import RemindPassword from "./pages/auth/RemindPassword";
import RefreshPassword from "./pages/auth/RefreshPassword";

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
    minHeight: "calc(100vh)"
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
  return (
    <Router>
      <div className={classes.root}>
        <SidePanel />
        <MenuBar />
        <Switch>
        <Route path="/remind-password">
            <RemindPassword />
          </Route>
          <Route path="/refresh-password/:token">
            <RefreshPassword />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
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
  count: { addBy, addByAsync, remove, removeAsync }
}) => ({
  addByOne: () => addBy(1),
  addByOneAsync: () => addByAsync(1),
  removeOne: () => remove(),
  removeOneAsync: () => removeAsync()
});
export default connect(mapState, mapDispatch)(App);

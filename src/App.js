import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/main";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import MenuBar from "./pages/components/MenuBar";
import SidePanel from "./pages/components/SidePanel";
function App(props) {
  return (
    <Router>
      <div className="App">
        <SidePanel />
        <MenuBar />
        <Switch>
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

import React from "react";
import { connect } from "react-redux";
import "../App.scss";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <h1>The count is: {props.count}</h1>
          <button onClick={props.addByOne}>Add 1</button>
          <button onClick={props.addByOneAsync}>Add 1 Async</button>
          <button onClick={props.removeOne}>remove 1</button>
          <button onClick={props.removeOneAsync}>remove 1 Async</button>
        </div>
      </header>
    </div>
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

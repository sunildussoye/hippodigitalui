import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searchtable from "./component/Searchtable";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Searchtable/>
      </div>
    );
  }
}

export default App;

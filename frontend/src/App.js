import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
//import Trends from './pages/trends';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/trends" component={Trends} /> */}
      </Switch>
    </Router>
  );
}

export default App;
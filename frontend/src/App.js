import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Trends from "./pages/trends";
import Compare from "./pages/compare";
import About from "./pages/about";
import Teste from "./pages/teste";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/trends" component={Trends} />
        <Route path="/compare" component={Compare} />
        <Route path="/about" component={About} />
        <Route path="/teste" component={Teste} />
      </Switch>
    </Router>
  );
}

export default App;

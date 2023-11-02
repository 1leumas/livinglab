import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Aeroporto from './pages/Aeroporto';
import Cruzeiro from './pages/Cruzeiro';
import Particulas from './pages/Particulas';
import About from './pages/About';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/aeroporto' component={Aeroporto} />
          <Route path='/cruzeiro' component={Cruzeiro} />
          <Route path='/particulas' component={Particulas} />
          <Route path='/about' component={About} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
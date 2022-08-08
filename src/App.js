import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Configurações from './pages/Configurações';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/Configurações" component={ Configurações } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}

import React from 'react';
import '../styles/App.css';
import { Switch, Route } from "react-router"

import Login from './Login'
import Home from './Home'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route path={"/login"} component={Login} />
        <Route path={"/home"} component={Home} />
      </Switch>
    </div>
  );
}

export default App;

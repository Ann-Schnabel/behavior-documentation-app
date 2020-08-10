import React from 'react';
import '../styles/App.css';
import { Switch, Route } from "react-router"

import Login from './Login'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Login} />
      </Switch>
    </div>
  );
}

export default App;

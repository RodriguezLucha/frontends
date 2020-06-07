import React from 'react';
import { Card } from './features/card/Card';
import { Recall } from './features/recall/Recall';
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Card}/>
          <Route exact path="/recall/:id" component={Recall}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

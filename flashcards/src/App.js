import React from "react";
import { Card } from "./features/card/Card";
import { Category } from "./features/category/Category.js";
import { AddCategory } from "./features/category/AddCategory.js";
import { AddEditCard } from "./features/card/AddEditCardForm";
import { Recall } from "./features/recall/Recall";
import { BrowserRouter, Switch, Route, NavLink, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <NavLink to="/category">Category</NavLink>
            <NavLink to="/card">Card</NavLink>
          </nav>
        </header>
        <Switch>
          <Route exact path="/category" component={Category} />
          <Route exact path="/card" component={Card} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/category/add" component={AddCategory} />
          <Route exact path="/card/add" component={AddEditCard} />
          <Route exact path="/card/edit/:id" component={AddEditCard} />
          <Route exact path="/recall/:id" component={Recall} />
          <Route exact path="/">
            <Redirect to="/category" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

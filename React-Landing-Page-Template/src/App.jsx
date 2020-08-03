import React, { Component } from 'react'
import { Router, Route, Link, Switch } from 'react-router-dom';
import { Home, Login, Register, Recipe, AddRecipe, Food} from 'pages';

export class App extends Component {

  render() {
    return (
      <div>
        <Route exact path = "/" component = {Home}/>
        <Switch>
          <Route path= "/login" component = {Login}/>
          <Route path= "/register" component = {Register}/>
          <Route path= "/recipe" component = {Recipe}/>
          <Route exact path= "/recipeadd" component = {AddRecipe}/>
          <Route path = "/food" component = {Food}/>
        </Switch>
      </div>
    )
  }
}

export default App;

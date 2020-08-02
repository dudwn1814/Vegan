import React, { Component } from 'react'
import { Router, Route, Link, Switch } from 'react-router-dom';
import { Home, Login, Register} from 'pages';

export class App extends Component {

  render() {
    return (
      <div>
        <Route exact path = "/" component = {Home}/>
        <Switch>
          <Route path= "/login" component = {Login}/>
          <Route path= "/register" component = {Register}/>
        </Switch>
      </div>
    )
  }
}

export default App;

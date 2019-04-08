import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Pages from './pages'
import Nav from './components/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Pages.HomePage} />
            <Route path="/java" component={Pages.JavaPage} />
            <Route path="/account" component={Pages.AccountPage} />
            <Route path="/contact" component={Pages.ContactPage} />
            <Route component={Pages.NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

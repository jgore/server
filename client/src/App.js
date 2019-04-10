import React, { Component } from 'react';
import './App.css';
import "./Java.css"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Pages from './pages'
import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'
import WindowEvents from './utils/WindowEvents'

// let GlobalContext = React.createContext()

class App extends Component {
  constructor(props) {
    super(props)
    // this.windowEvents = new WindowEvents()
  }
  render() {
    return (
      
        <Router>
          <React.Fragment>
            <Nav />
            <Main>
              <Switch>
                <Route exact path="/" component={Pages.HomePage} />
                <Route path="/java" component={Pages.JavaPage} />
                <Route path="/account" component={Pages.AccountPage} />
                <Route path="/contact" component={Pages.ContactPage} />
                <Route component={Pages.NotFoundPage} />
              </Switch>
            </Main>
            <Footer />
          </React.Fragment>
        </Router>
    );
  }
}

export default App;

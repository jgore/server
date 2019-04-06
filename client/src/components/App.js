import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import materializeCss from 'materialize-css/dist/css/materialize.min.css'
import {connect} from 'react-redux'
import * as actions from '../actions'

import Header from './Header';
import Contact from './contact/Contact'
import Landing from './Landing'
import Footer from './Footer'
import Account from './account/Account'
import Training from './training/Training'

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className={"container"}>
        <BrowserRouter>
          <div style={{marginBottom: '50px'}}>
            <Header/>

            <Route exact={true} path="/" component={Training}/>
            <Route exact={true} path="/java" component={Landing}/>
            <Route exact={true} path="/account" component={Account}/>
            <Route exact={true} path="/contact" component={Contact}/>
          </div>
        </BrowserRouter>
        <Footer/>
      </div>
    )
  }
}

export default connect(null, actions)(App);
import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import materializeCss from 'materialize-css/dist/css/materialize.min.css'
import {connect} from 'react-redux'
import * as actions from '../actions'

import Header from './Header';
import Contact from './Contact'
import Landing from './Landing'

const Dashboard = () => <h2> Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew </h2>

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className={"container"}>
        <BrowserRouter>
          <div>
            <Header/>

            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>

            <Route exact={true} path="/" component={Landing}/>
            <Route exact={true} path="/surveys" component={Dashboard}/>
            <Route path="/surveys/new" component={SurveyNew}/>
            <Route exact={true} path="/contact" component={Contact}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App);
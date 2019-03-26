import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Landing from "./Landing";

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'still logging'
      case false:
        return <li><a className={"waves-effect waves-light green btn"} href="/auth/google"> Login with google</a></li>
      default:
        return (<ul>
          <li>Hello, {this.props.auth.name}</li>
          <li><a  className={"waves-effect waves-light btn red"} href="/api/logout"> Logout </a></li>
        </ul>)
    }
  }

  render() {
    return (
      <nav>
        <div className={"nav-wrapper blue lighten-3"}>
          <Link
            to={this.props.auth ? 'surveys' : '/'}
            className={"left brand-logo"}>
            Welcome to Gjava
          </Link>
          <ul className={"right"}>
            <li>
              <a>{this.renderContent()}</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({auth}) {
  return {auth}
}

export default connect(mapStateToProps)(Header);
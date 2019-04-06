import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
          <li><a className={"waves-effect waves-light btn red"} href="/api/logout"> Logout </a></li>
        </ul>)
    }
  }

  render() {
    return (
      <nav className={"nav-extended blue lighten-3"}>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? 'surveys' : '/'}
            className={"left brand-logo"}>
            Gjava - Szkolimy Programistow
          </Link>
          <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className={"nav-mobile right"}>
            <li>
              <a>{this.renderContent()}</a>
            </li>
          </ul>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
              <li className="tab"><Link to="/">Home</Link></li>
              <li className="tab"><Link to="/java">Java</Link></li>
              <li className="tab"><Link to="/account">Konto</Link></li>
              <li className="tab"><Link to="/contact">Kontakt</Link></li>
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
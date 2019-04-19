import React, {Component} from "react";
import {Button, Nav as NavComponent, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FaGoogle} from "react-icons/fa";
import {AuthContext} from "../App";

class Nav extends Component {
  state = {
    auth: false,
    routes: [
      {
        name: "Home",
        path: "/"
      },
      {
        name: "Java",
        path: "/java"
      },
      {
        name: "Konto",
        path: "/account"
      },
      {
        name: "Kontakt",
        path: "/contact"
      }
    ],
    navExpanded: false
  };

  renderContent(auth, logout) {
    switch (auth) {
      case null:
        return "still logging";
      case false:
        return (
          <a
            className={"waves-effect waves-light green btn"}
            href={"/auth/google"}
          >
            <Button className="flexible flexible-horizontal-center google-button">
              <FaGoogle /> Login with Google
            </Button>
          </a>
        );
      default:
        return (
          <div
            style={{ color: "white" }}
            className="flexible flexible-horizontal-center flexible-vertical-space-between"
          >
            Witaj, {auth.name}
            <a
              className={"waves-effect waves-light btn red"}
              href={"/api/logout"}
            >
              <Button
                className="flexible flexible-horizontal-center google-button"
                onClick={logout}
              >
                <FaGoogle /> Logout
              </Button>{" "}
            </a>
          </div>
        );
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      if (this.state.navExpanded) {
        this.setState({
          navExpanded: false
        });
      }
    });
  }

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }

  closeNav() {
    this.setState({ navExpanded: false });
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ auth, login, logout }) => (
          <div className="flexible flexible-vertical-center sticky-nav-top">
            <Navbar
              bg="dark"
              variant="dark"
              className="custom-container"
              expand="md"
              expanded={this.state.navExpanded}
              onToggle={this.setNavExpanded.bind(this)}
            >
              <Navbar.Brand>GJava</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse>
                <NavComponent className="mr-auto">
                  {this.state.routes.map((value, index) => {
                    return (
                      <LinkContainer key={index} exact to={value.path}>
                        <a onClick={this.closeNav.bind(this)}>{value.name}</a>
                      </LinkContainer>
                    );
                  })}
                </NavComponent>
                {this.renderContent(auth, logout)}
              </Navbar.Collapse>
            </Navbar>
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Nav;

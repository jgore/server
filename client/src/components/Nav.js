import React, {Component} from 'react'
import {Button, Nav as NavComponent, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {FaGoogle} from 'react-icons/fa'
import Axios from "axios/index";

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
    ]
  }

  renderContent() {
    switch (this.state.auth) {
      case null:
        return 'still logging'
      case false:
        return <a className={"waves-effect waves-light green btn"} href={"/auth/google"}>
          <Button className="flexible flexible-horizontal-center google-button">
            <FaGoogle/> Login with Google
          </Button></a>
      default:
        return (<div style={{color: "white"}}>
          Witaj, {this.state.auth.name}

          <a className={"waves-effect waves-light btn red"} href={"/api/logout"}>
            <Button className="flexible flexible-horizontal-center google-button">
              <FaGoogle/> Logout
            </Button> </a>
        </div>)
    }
  }

  componentDidMount() {
    Axios(`/api/current_user`)
      .then((res) => {
        this.setState({
          auth: res.data || false,
          error: null
        })
      }).catch((err) => {
      if (err.response) {
        this.setState({
          error: err.response.status
        })
      } else {
        this.setState({
          error: 500
        })
      }
    }).finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  render() {
    return (
      <div className="flexible flexible-vertical-center sticky-nav-top">
        <Navbar bg="dark" variant="dark" className="custom-container">
          <Navbar.Brand>
            GJava
          </Navbar.Brand>
          <NavComponent className="mr-auto">
            {
              this.state.routes.map((value, index) => {
                return (
                  <LinkContainer key={index} exact to={value.path}>
                    <a>{value.name}</a>
                  </LinkContainer>
                )
              })
            }
          </NavComponent>
          {this.renderContent()}
        </Navbar>
      </div>
    )
  }
}

export default Nav
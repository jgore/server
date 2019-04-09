import React, { Component } from 'react'
import { Navbar, Nav as NavComponent, Form, FormControl, Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaGoogle } from 'react-icons/fa'

class Nav extends Component {
    state = {
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
                    <Form inline>
                        <Button className="flexible flexible-horizontal-center google-button">
                            <FaGoogle /> Login with Google
                        </Button>
                    </Form>
                </Navbar>
            </div>
        )
    }
}

export default Nav
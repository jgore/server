import React, { Component } from 'react'
import { Navbar, Nav as NavComponent, Form, FormControl, Button, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


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
            <div>
                <Navbar bg="dark" variant="dark">
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
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
            </div>
        )
    }
}

export default Nav
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav as NavComponent, Form, FormControl, Button, NavItem } from 'react-bootstrap'

let routes = [
    
]

class Nav extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">

                    </Navbar.Brand>
                    <NavComponent className="mr-auto">
                        <NavItem >

                        </NavItem>
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
import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap'

class Account extends Component {
    render() {
        return (
            <div className="Account">
                <Jumbotron>
                Nie kupiłeś jeszcze żadnych produktów
                </Jumbotron>
            </div>
        );
    }
}

export default Account;

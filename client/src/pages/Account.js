import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap'

class Account extends Component {
  render() {
    return (
      <div className="Account">
        <Jumbotron>
          <button type="button" className="btn btn-secondary btn-lg btn-block"> Ta sekcja jest widoczna tylko dla
            zalogowanych użytkowników
          </button>
        </Jumbotron>
      </div>
    );
  }
}

export default Account;

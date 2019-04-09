import React, {Component} from 'react';
import EmailForm from './../components/EmailForm'
import {Jumbotron} from 'react-bootstrap'

class Contact extends Component {


  render() {
    return (
      <div  style={{marginTop:20}} className="Contact">
        <Jumbotron>
          <div>
            <p>Gjava - Szkolimy Programistów </p>
            <p>Leszczyńskiego 4, 50-078</p>
            <p>50-078, Wrocław</p>
            <p>Tel : 535 106 204</p>
          </div>

        </Jumbotron>

        <EmailForm/>
      </div>
    );
  }
}

export default Contact;
import React, {Component} from 'react';
import EmailForm from './../components/EmailForm'
import {Jumbotron} from 'react-bootstrap'
import {PUBLIC_RESOURSES_URL} from "../utils/variables";

class Contact extends Component {

  render() {
    return (

      <div style={{marginTop: 20}} className="Contact">
        <Jumbotron>
          <div className="media">
            <img className="img-thumbnail" src={`${PUBLIC_RESOURSES_URL}/lesz.jpg`} alt="Gjava building" />
              <div style={{margin: 20}} className="media-body">
                <h5  className="mt-0">Gjava - Szkolimy Programistów</h5>
                <p>Leszczyńskiego 4, 50-078 <br />
                  50-078, Wrocław
                </p>
                <p>Tel : 535 106 204</p>
              </div>
          </div>

        </Jumbotron>

        <EmailForm/>
      </div>
  );
  }
  }

  export default Contact;
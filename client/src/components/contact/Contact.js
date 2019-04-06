import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../actions/index'
import ContactForm from './ContactForm'

class Contact extends Component {

  render() {
    {
      this.renderEmailed()
    }
    return (
      <div style={{border: '5px'}}>
        <div className={"row"}>
          <br />
          <br />
          <p>Gjava - Szkolimy Programistów</p>
          <p><b>Adres</b> : Leszczyńskiego 4</p>
          <p>50-078, Wrocław</p>
          <p>Telefon : 535 106 204</p>
        </div>

        <hr />

        <ContactForm callback={this.props.sendEmail}/>

      </div>
    )
  }

  renderEmailed() {
    if (this.props.email) {
      alert("Email was sent")
      window.location.reload();
    }
  }


}

function mapStateToProps({email}) {
  return {email}
}

export default connect(mapStateToProps, actions)(Contact);
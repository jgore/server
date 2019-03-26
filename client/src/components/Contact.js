import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../actions'

class Contact extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {

    let options = {
      subject: event.target.subject.value,
      text: event.target.text.value,
      email: event.target.email.value
    }

    event.preventDefault();
    this.props.sendEmail(options)

  }

  render() {
    return (
      <div className={"row"}>
        <form onSubmit={this.handleSubmit} className={"col s6"}>

          <div>

            <div className={"input-field col 12"}>
              <input  required={true} placeholder={"subject"} id={"subject"} type={"text"} className={"materialize-textarea validate"}
                     data-length="120"/>
            </div>

            <div className={"input-field col s12"}>
              <input required={true}  placeholder={"text"} id={"text"} type={"text"} className={"materialize-textarea validate"}
                     data-length="120"/>
            </div>

            <div className={"input-field col s6"}>
              <input required={true} placeholder={"email"} id={"email"} type={"text"} className={"validate"}/>
            </div>
          </div>

          <button className={"btn waves-effect waves-light"} >
            Send
          </button>

        </form>

      </div>
    )
  }
}

function mapStateToProps({auth}) {
  return {auth}
}

export default connect(null, actions)(Contact);
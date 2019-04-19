import React, { Component } from 'react'
import Axios from "axios/index";
import ReCaptcha from 'react-recaptcha'
import { Alert, Button } from 'react-bootstrap'

class EmailForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      emailed: false,
      courses: [],
      isLoading: true,
      error: null,
      isVerified: null,
      online: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this)
  }

  render() {
    return (
      <div style={{ marginTop: 50, marginBottom: 50 }}>

        <form onSubmit={this.handleSubmit}>

          <div className="col-auto my-1">
            <h2 className="header">Formularz kontaktowy</h2>
            <label className="mr-sm-2" htmlFor="subject">Temat</label>
            <select onChange={this.handleChange} className="custom-select mr-sm-2" id="subject">
              <option defaultValue>Wybierz kurs...</option>
              <option value="java00">Kurs Programowania Java 00 - Korepetycje [ 0 lat doświadczenia ]</option>
              <option value="java0">Kurs Programowania Java 0 - Company [ 0 lat doświadczenia ]</option>
              <option value="java1">Kurs Programowania Java 1 - Shop [ 0,1,2 lat doświadczenia ]</option>
              <option value="java1++">Kurs Programowania Java 1++ - Flights [ projekt + rozmowa kwalifikacyjna + zadanie ] - [ 1,2 lat doświadczenia ]</option>
              <option value="java2">Kurs programowania Java 2 - Bookify 2 [ 2++ lat doświadczenia ]</option>
              <option value="others"> Pozostałe</option>
            </select>
          </div>

          <div style={{ margin: 20 }} className="form-group">
            <label htmlFor="text">Treść</label>
            <textarea required value={this.state.text} onChange={this.handleChange} cols={40} rows={10}
              className="form-control" id="text"
              placeholder="text" />
          </div>

          <div style={{ margin: 20 }} className="form-group form-check">
            <input onChange={this.handleChange} type="checkbox" className="form-check-input" id="online" />
            <label className="form-check-label" htmlFor="online">Czy kurs ma być Online ?</label>
          </div>

          <div style={{ margin: 20 }} className="form-group">
            <label htmlFor="email">Email address</label>
            <input required value={this.state.email} onChange={this.handleChange} type="email" className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.
            </small>
          </div>

          <div style={{ margin: 20 }} className="form-group">
            <label htmlFor="phone">Phone number </label>
            <input value={this.state.phone} onChange={this.handleChange} type="phone" className="form-control"
              id="phone"
              aria-describedby="emailHelp"
              placeholder="Enter phone number" />
            <small id="emailHelp" className="form-text text-muted">We will call you back if you will leave phone number.
            </small>
          </div>
          <div style={{ margin: 20 }} className="form-group">
            <ReCaptcha
              sitekey="6Ld51Z0UAAAAAOhQITxCyO8Iw69V0h3iD0W9Qtjp"
              render="explicit"
              onloadCallback={this.recaptchaLoaded.bind(this)}
              verifyCallback={this.handleCaptcha}
            />
          </div>
          {
            this.state.isVerified === null ?
              "" :
              this.state.isVerified ?
                "" :
                <Alert variant="danger" style={{ maxWidth: 400, marginTop: "1rem" }}>
                  Proszę wypełnić Captche !!!
                </Alert>
          }
          <Button
            style={{ margin: 20 }}
            variant="primary" size="lg" active
            type="submit"
          >Wyślij</Button>
        </form>
      </div>

    )
  }

  recaptchaLoaded() {
    console.log("Captcha loaded")
  }

  handleChange(event) {
    if (event.target.type === "text") {
      this.setState({ phone: event.target.value })
    }
    else if (event.target.type === "email") {
      this.setState({ email: event.target.value })
    }
    else if (event.target.type === "textarea") {
      this.setState({ text: event.target.value })
    }
    else if (event.target.type === 'select-one') {
      this.setState({ subject: event.target.value });
    }
    else if (event.target.type === 'checkbox') {
      this.setState({ online: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isVerified) {
      Axios.post(`/api/sendEmail`, {
        subject: this.state.subject,
        text: this.state.text,
        email: this.state.email,
        phone: this.state.phone,
        online: this.state.online
      })
        .then((res) => {
          alert('Email was sent')

          this.setState({
            emailed: res.data,
            error: null
          })
        }).catch((err) => {
          if (err.response) {
            this.setState({
              error: err.response.status
            })
            alert("Sorry - email was not sent because of server problems.")
          } else {
            this.setState({
              error: 500
            })
          }
        }).finally(() => {
          this.setState({
            isLoading: false,

          })
          window.location.reload()
        })
    } else {
      this.setState({
        isVerified: false
      })
    }
  }

  handleCaptcha(response) {
    if (response) {
      this.setState({
        isVerified: "VERIFIED"
      })
    } else {
      this.setState({
        isVerified: "UNVERIFIED"
      })
    }
  }


}

export default EmailForm
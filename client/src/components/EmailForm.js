import React, { Component } from 'react'
import { API_URL } from "../utils/variables";
import Axios from "axios/index";
import ReCaptcha from 'react-recaptcha'
import { Alert } from 'react-bootstrap'

class EmailForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      emailed: false,
      courses: [],
      isLoading: true,
      error: null,
      isVerified: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this)
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


  render() {
    return (
      <div style={{ marginTop: 50, marginBottom: 50 }} className="border border-primary">

        <form onSubmit={this.handleSubmit}>

          <div className="col-auto my-1">
            <p> Formularz kontaktowy</p>
            <label className="mr-sm-2" htmlFor="subject">Temat</label>
            <select onChange={this.handleChange} className="custom-select mr-sm-2" id="subject">
              <option selected>Wybierz ...</option>
              <option value="java0">Kurs Programowania Java 0 - Company [ 0 lat doświadczenia ]</option>
              <option value="java1">Kurs Programowania Java 1 - Shop [ 0,1,2 lat doświadczenia ]</option>
              <option value="java1++">Kurs Programowania Java 1++ - FlyWithUs [ projekt + rozmowa kwalifikacyjna + zadanie ] - [ 1,2 lat doświadczenia ]</option>
              <option value="java2">Kurs programowania Java 2 - Tropics 2 [ 2++ lat doświadczenia ]</option>
              <option value="others"> Pozostałe</option>
            </select>
          </div>

          <div style={{ margin: 20 }} className="form-group">
            <label htmlFor="text">Treść</label>
            <textarea required value={this.state.text} onChange={this.handleChange} cols={40} rows={10}
              className="form-control" id="text"
              placeholder="text" />
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
          <ReCaptcha
            sitekey="6LcsdZ0UAAAAAITDsNQyr6m-aGF5fDbF7O0AbByG"
            render="explicit"
            onloadCallback={this.recaptchaLoaded.bind(this)}
            verifyCallback={this.handleCaptcha}
          />
          {
            this.state.isVerified === null ?
              "" :
              this.state.isVerified ?
                "" :
                <Alert variant="danger" style={{ maxWidth: 400, marginTop: "1rem" }}>
                  Proszę wypełnić Captche !!!
                </Alert>
          }
          <button style={{ margin: 20 }} type="submit" className="btn btn-primary">Wyślij</button>
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
    if (event.target.type === "email") {
      this.setState({ email: event.target.value })
    }
    else if (event.target.type === "textarea") {
      this.setState({ text: event.target.value })
    }
    else if (event.target.type === 'select-one') {
      this.setState({ subject: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.isVerified)
    if (this.state.isVerified) {
      Axios.post(`${API_URL}/api/sendEmail`, {
        subject: this.state.subject,
        text: this.state.text,
        email: this.state.email,
        phone: this.state.phone
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


}

export default EmailForm
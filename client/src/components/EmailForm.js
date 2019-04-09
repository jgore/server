import React, {Component} from 'react'
import {API_URL} from "../utils/variables";
import Axios from "axios/index";

class EmailForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      emailed: false,
      courses: [],
      isLoading: true,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div style={{marginTop: 50, marginBottom: 50}} className="border border-primary">

        <p> Formularz kontaktowy</p>
        <form onSubmit={this.handleSubmit}>

          <div className="col-auto my-1">
            <label className="mr-sm-2" htmlFor="subject">Temat</label>
            <select onChange={this.handleChange} className="custom-select mr-sm-2" id="subject">
              <option selected>Wybierz ...</option>
              <option value="java1">Kurs Programowania Java 1 - Company [ 0 lat doświadczenia ]</option>
              <option value="java2">Kurs Programowania Java 2 - Shop [ 0,1,2 lat doświadczenia ]</option>
              <option value="java2++">Kurs Programowania Java 2++ - FlyWithUs [ rozmowa kwalifikacyjna +  zadanie ] - [ 1,2 lat doświadczenia ]</option>
              <option value="java3">Kurs programowania Java 3 - Tropics 2 [ 2++ lat doświadczenia ]</option>
              <option value="others"> Pozostałe</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="text">Text</label>
            <textarea required value={this.state.text} onChange={this.handleChange} cols={40} rows={10}
                   className="form-control" id="text"
                   placeholder="text"/>
          </div>

          <div style={{margin: 20}} className="form-group">
            <label htmlFor="email">Email address</label>
            <input required value={this.state.email} onChange={this.handleChange} type="email" className="form-control"
                   id="email"
                   aria-describedby="emailHelp"
                   placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.
            </small>
          </div>

          <div style={{margin: 20}} className="form-group">
            <label htmlFor="phone">Phone number </label>
            <input value={this.state.phone} onChange={this.handleChange} type="phone" className="form-control"
                   id="phone"
                   aria-describedby="emailHelp"
                   placeholder="Enter phone number"/>
            <small id="emailHelp" className="form-text text-muted">We will call you back if you will leave phone number.
            </small>
          </div>

          <button style={{margin:20}} type="submit" className="btn btn-primary">Wyślij</button>
        </form>
      </div>

    )
  }

  handleChange(event) {
    if (event.target.type === "text") {
      this.setState({phone: event.target.value})
    }
    if (event.target.type === "email") {
      this.setState({email: event.target.value})
    }
    else if (event.target.type === "textarea") {
      this.setState({text: event.target.value})
    }
    else if (event.target.type === 'select-one') {
      this.setState({subject: event.target.value});
    }
  }

  handleSubmit(event) {

    Axios.post(`${API_URL}/sendEmail`, {
      subject: this.state.subject,
      text: this.state.text,
      email: this.state.email,
      phone : this.state.phone
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
    event.preventDefault();
  }
}

export default EmailForm
import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import Select from 'react-select';
import ContactField from './ContactField'
import _ from 'lodash'

const FIELDS = [
  {label: 'text', name: 'text'},
  {label: 'email', name: 'email'},
];

const OPTIONS = [
  {value: 1, label: 'Kurs Programowania Java 1 [ beginner ] ( Company - tworzenie aplikacji od podstaw [ bez bazy danych )[ Przed pierwsza praca : -0]'},
  {value: 2, label: 'Kurs Programowania Java 2 [ junior - mid ] ( Shop - tworzenia aplikacji od podstaw  z baza danych[ Spring, Hibernate, SQL ]) [ 0,1,2 lata jako Java Developer'},
  {value: 3, label: 'Kurs Programowania Java 3 [ mid - senior ] ( Tropics 2 - rewrite dużej korporacyjnej aplikacji) [2++ lat jako Java Developer]'},
  {value: 4, label: 'Finansowanie'},
  {value: 5, label: 'Pozostałe'}
]


class ContactForm extends Component {

  handleSubmit = values => {

    console.log(values)
    this.props.callback(values);
  }


  renderFields() {
    return _.map(FIELDS, ({label, name}) => {
        return (
          <Field
            key={name}
            component={ContactField}
            type='text'
            label={label}
            name={name}> </Field>
        )
      }
    )
  }

  change (event){
    console.log(event.target.value)
  }


  render() {

    return (

      <div style={{border: '10px'}}>
        <p> <b>Formularz kontaktowy </b></p>
        <form onSubmit={this.props.handleSubmit(e => this.handleSubmit(e))}>

          <div className={"input-field col s12"}>
            <Select value = "subject" onChange = {this.change} ref="subject" name={"subject"} placeholder={"Wybierz temat wiadomości"} options={OPTIONS}/>
          </div>

          {this.renderFields()}

          <button style={{marginBottom: '50px'}} type="submit" className="teal btn-flat left white-text">
            Wyślij
          </button>
        </form>
      </div>
    )
  }



}



function validate(values) {
  const errors = {}

  _.each(FIELDS, ({name}) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}`
    }
  })
  return errors
}

export default reduxForm({
  validate,
  form: 'contactForm'
})(ContactForm)
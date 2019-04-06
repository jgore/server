import { combineReducers} from 'redux'
import {reducer as reduxForm}  from 'redux-form'
import authReducer from './authReducer'
import emailRecuder from './emailReduder'

export default combineReducers({
  auth: authReducer,
  email: emailRecuder,
  form: reduxForm
})
import axios from 'axios';
import {FETCH_USER, SEND_EMAIL} from './types'

export const fetchUser = () => {
  return function (dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({type: FETCH_USER, payload: res}))
  }
}

export const sendEmail = (req) => async dispatch => {
  const res = await axios.post('/api/sendEmail', req)

  dispatch({type: SEND_EMAIL, payload: res})
}

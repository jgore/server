import {FETCH_USER,SEND_EMAIL} from "../actions/types";

export default function (state = null, action) {
  console.log(action)
  switch (action.type) {
    case  FETCH_USER:
      return action.payload.data || false;
    default:
      return state;
  }
}
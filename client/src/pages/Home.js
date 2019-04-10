import React, {Component} from 'react';
import Main from '../components/Main'
import {API_URL} from '../utils/variables'
import Axios from 'axios'
import Loading from '../components/Loading'
import Courses from '../components/courses'
import Error from '../components/Error';

class Home extends Component {

  state = {
    courses: [],
    isLoading: true,
    error: null
  }

  componentDidMount() {
    console.log(`${API_URL}/courses`)
    Axios(`${API_URL}/courses`)
      .then((res) => {
        this.setState({
          courses: res.data,
          error: null
        })
      }).catch((err) => {
      if (err.response) {
        this.setState({
          error: err.response.status
        })
      } else {
        this.setState({
          error: 500
        })
      }
    }).finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  render() {
    return (
      <div className="Home">
        {
          this.state.isLoading ?
            <Loading/> :
            <React.Fragment>
              {
                this.state.error ?
                  <Error
                    errorCode={this.state.error}
                  />
                  :
                  <Courses
                    courses={this.state.courses}
                  />

              }
            </React.Fragment>

        }
      </div>
    )
  }
}

export default Home;
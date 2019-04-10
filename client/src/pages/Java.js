import React, { Component } from 'react';
import Videos from '../components/Videos';
import Axios from 'axios';
import { API_URL } from '../utils/variables';
import Error from '../components/Error'
import Loading from '../components/Loading'

class Java extends Component {

  state = {
    videos: [],
    isLoading: true,
    error: null
  }

  componentDidMount() {
    Axios(`${API_URL}/api/videos`)
      .then((res) => {
        this.setState({
          videos: res.data
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
      <div className="Java">
        {
          this.state.isLoading ?
            <Loading /> :
            <React.Fragment>
              {
                this.state.error ?
                  <Error
                    errorCode={this.state.error}
                  />
                  :
                  <Videos
                    videos={this.state.videos}
                  />

              }
            </React.Fragment>

        }
      </div>
    )

  }
}

export default Java;
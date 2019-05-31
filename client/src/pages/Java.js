import React, { Component } from "react";
import Videos from "../components/sections/videos/Videos";
import Axios from "axios";
import AppError from "../components/errors/AppError";
import Loading from "../components/helpers/Loading";
import { Helmet } from "react-helmet";

class Java extends Component {
  state = {
    videos: [],
    isLoading: true,
    error: null
  };

  componentDidMount() {
    Axios(`/api/videos`)
      .then(res => {
        this.setState({
          videos: res.data
        });
      })
      .catch(err => {
        if (err.response) {
          this.setState({
            error: err.response.status
          });
        } else {
          this.setState({
            error: 500
          });
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div className="Java">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
        </Helmet>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            {this.state.error ? (
              <AppError errorCode={this.state.error} />
            ) : (
              <Videos videos={this.state.videos} />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Java;

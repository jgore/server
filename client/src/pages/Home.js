import React, { Component } from "react";
import Axios from "axios";
import Loading from "../components/helpers/Loading";
import Courses from "../components/sections/courses/Courses";
import AppError from "../components/errors/AppError";
import { Helmet } from "react-helmet";

class Home extends Component {
  state = {
    courses: [],
    isLoading: true,
    error: null
  };

  componentDidMount() {
    Axios(`/api/courses`)
      .then(res => {
        this.setState({
          courses: res.data,
          error: null
        });
        console.log(res);
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

  componentDidCatch(error) {
    this.setState({
      error: 500
    });
  }

  render() {
    console.log(this.state.courses);
    return (
      <div className="Home">
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
              <Courses courses={this.state.courses} />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Home;

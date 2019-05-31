import React, { Component } from "react";
import AppError from "../components/errors/AppError";
import { Helmet } from "react-helmet";

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
        </Helmet>
        <AppError errorCode={404} />
      </div>
    );
  }
}

export default NotFound;

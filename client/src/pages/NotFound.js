import React, { Component } from "react";
import AppError from "../components/errors/AppError";

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <AppError errorCode={404} />
      </div>
    );
  }
}

export default NotFound;

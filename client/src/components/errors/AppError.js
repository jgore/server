import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

let errors = [
  {
    code: 404,
    description: "Nie ma takiego zasobu"
  },
  {
    code: 500,
    description:
      "Problem z wysłaniem żądania do serwera, skontaktuj się z administratorem"
  }
];

const AppError = ({ errorCode, history }) => {
  let error = errors.find(error => {
    if (errorCode >= 500) {
      return error.code === 500;
    }
    return error.code === errorCode;
  });
  return (
    <Jumbotron>
      <h1>Error: {errorCode}</h1>
      <p>{error ? error.description : ""}</p>
      <p>
        {errorCode === 404 ? (
          <Button onClick={() => history.push("/")}>Powrót do strony głównej</Button>
        ) : (
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        )}
      </p>
    </Jumbotron>
  );
};

AppError.propTypes = {
  errorCode: PropTypes.number.isRequired
};

export default withRouter(AppError);

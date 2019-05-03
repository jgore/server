import React from "react";
import { CardDeck } from "react-bootstrap";
import PropTypes from "prop-types";
import OpinionModal from "./../../modals/OpinionModal";
import Course from './Course'

class Courses extends React.Component {
  state = {
    isModal: false,
    reviews: []
  };

  render() {
    let modalOpen = reviews => this.setState({ isModal: true, reviews });
    let modalClose = () => this.setState({ isModal: false });
    return (
      <React.Fragment>
        <h1>Kursy</h1>
        <CardDeck className="section">
          {this.props.courses.map((value, index) => (
            <Course
              key={index}
              course={value}
              modalOpen={modalOpen}
              modalClose={modalClose}
            />
          ))}
          {this.state.isModal ? (
            <OpinionModal
              isModal={this.state.isModal}
              reviews={this.state.reviews}
              handleClose={modalClose}
            />
          ) : (
            ""
          )}
        </CardDeck>
      </React.Fragment>
    );
  }
}

Courses.propTypes = {
  courses: PropTypes.array.isRequired
};

export default Courses;

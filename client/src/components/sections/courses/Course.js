import React from "react";
import { Card, Button } from "react-bootstrap";
import { PUBLIC_RESOURSES_URL } from "../../../utils/variables";
import PropTypes from "prop-types";
import Stars from "../../helpers/ReactStars";
import { LinkContainer } from "react-router-bootstrap";

const Course = ({
  coruse: {
    title,
    shortTitle,
    image,
    duration,
    price,
    shortDescription,
    reviews,
    _id
  },
  modalOpen
}) => {
  let averageRate = null;
  for (let i = 0; i < reviews.length; i++) {
    if (i === 0) {
      averageRate = reviews[i].grade;
    } else {
      averageRate += reviews[i].grade;
    }
  }
  averageRate = averageRate / reviews.length;
  return (
    <Card border="dark" style={{ minWidth: "40%" }} className="course__card">
      <Card.Img variant="top" src={`${PUBLIC_RESOURSES_URL}/${image}`} />
      <Card.Title>
        <h3>{title}</h3>
      </Card.Title>
      <Card.Body>
        <p>
          <b>Projekt</b>: {shortTitle}
        </p>
        <p>
          <b>Cena</b>: {price}
        </p>
        <p>
          <b>Czas trwania:</b> {duration}
        </p>
        <p>
          <b>Opis:</b> {shortDescription}
        </p>
        <div className="offert__stars">
          {averageRate ? (
            <div className="flexible flexible-horizontal-center">
              <b>Średnia ocena: </b>
              {averageRate}
              <Stars
                size={20}
                className="starses"
                count={5}
                value={averageRate}
                edit={false}
              />
            </div>
          ) : (
            <React.Fragment>
              <b>Średnia ocena: </b>
              Brak ocen
            </React.Fragment>
          )}
        </div>
      </Card.Body>
      <Card.Footer style={{ background: "#343A40" }}>
        <LinkContainer to={`/course/${shortTitle}`}>
          <Button variant="warning">Zobacz szczegóły</Button>
        </LinkContainer>
        {reviews.length > 0 ? (
          <Button onClick={() => modalOpen(reviews)}>
            Opinie ({reviews.length})
          </Button>
        ) : (
          <Button>Brak opini</Button>
        )}
      </Card.Footer>
    </Card>
  );
};

Course.propTypes = {
  course: PropTypes.exact({
    title: PropTypes.string.isRequired,
    shortTitle: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired
  })
};

export default Course;

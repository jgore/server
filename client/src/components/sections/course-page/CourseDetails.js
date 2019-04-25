import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import Video from "../../sections/videos/Video";
import PropTypes from "prop-types";

const CourseDetails = ({ course }) => (
  <React.Fragment>
    <Row>
      <Col>
        <h3>Szczegóły</h3>
      </Col>
    </Row>
    <Row />
    <Row>
      <Col sm="12" md="5">
        <Jumbotron fluid className="technologies">
          <Container>
            <h4>Technologie:</h4>
            <ul>
              {course.technologies.map((value, index) => (
                <React.Fragment key={index}>
                  <h6>{value.name}:</h6>
                  <ul>
                    {course.technologies[index].technologies.map(
                      (technology, index) => (
                        <li key={index}>{technology}</li>
                      )
                    )}
                  </ul>
                </React.Fragment>
              ))}
            </ul>
          </Container>
        </Jumbotron>
      </Col>
      <Col sm="12" md="7">
        <Video video={course.video} />
        <div
          className={"border border-primary"}
          style={{ padding: 20 }}
          dangerouslySetInnerHTML={{
            __html: course.content
          }}
        />
      </Col>
    </Row>
  </React.Fragment>
);

CourseDetails.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseDetails;

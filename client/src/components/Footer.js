import React from 'react'
import {Container, Row, Col} from "react-bootstrap";

export default () => (
  <Container className="footer custom-container">
    <Row>
      <Col
        sm={12}
        md={6}
        className="flexible flexible-column"
        // className="flexible flexible-column flexible-vertical-center flexible-horizontal-center"
      >
        <p> <span>"What is the difference between <b>Hero</b> and <b>Coward</b> ? <br/>
          There is no difference - they feel the same <br/> but Her  <b>do</b> what coward <b>doesn't"</b> </span></p>
      </Col>
      <Col
        sm={12}
        md={6}
      >
        <h5 className="blue">Linki</h5>
        <ul>
          <li><a href="http://goreit.pl">GoreIT</a></li>
          <li><a href="http://java.com">Java </a></li>
          <li><a href="http://reactjs.com">ReactJS</a></li>
        </ul>
      </Col>
    </Row>
    <Row>
      <Col>
        <p> Copyright by GJava 2019 </p>
      </Col>
    </Row>
  </Container>
)
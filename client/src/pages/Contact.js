import React from "react";
import EmailForm from "./../components/forms/EmailForm";
import { Col, Image, Row } from "react-bootstrap";
import { PUBLIC_RESOURSES_URL } from "../utils/variables";

const Contact = () => (
  <div style={{ marginTop: 20 }} className="Contact">
    <div className="custom-contact">
      <Row>
        <Col sm="12" md="5" className="flexible flexible-vertical-center">
          <Image
            className="img-thumbnail"
            src={`${PUBLIC_RESOURSES_URL}/lesz.jpg`}
            alt="Gjava building"
          />
        </Col>
        <Col sm="12" md="4" className="flexible flexible-horizontal-center">
          <div className="media-body">
            <h5 className="mt-0">Gjava - Szkolimy Programistów</h5>
            <p>
              Leszczyńskiego 4 <br />
              50-078, Wrocław
            </p>
            <p>Tel : 535 106 204</p>
          </div>
        </Col>
      </Row>
    </div>
    <EmailForm />
  </div>
);

export default Contact;

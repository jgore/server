import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

export default () => (
    <Container className="footer custom-container">
        <Row>
            <Col
                sm={12}
                md={6}
                className="flexible flexible-column"
            // className="flexible flexible-column flexible-vertical-center flexible-horizontal-center"
            >
                <a href="#">Tutaj jest jakiś link</a>
                <a href="#">Tutaj jest jakiś link</a>
                <a href="#">Tutaj jest jakiś link</a>
            </Col>
            <Col
                sm={12}
                md={6}
            >
                <h5 className="blue">Dane Kontaktowe</h5>
                <ul>
                    <li>Janusz Kowalski</li>
                    <li>ul. Kowalskiego 12a</li>
                    <li>Kraków, 40-345</li>
                    <li>jkowalski@gjava.com</li>
                </ul>
                <h5 className="blue">Dane Firmy</h5>
                <ul>
                    <li>GJava</li>
                    <li>ul. Bronowicka 123</li>
                    <li>Wrocław, 30-873</li>
                    <li>admin@gjava.com</li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <p>&copy; 2019 GJava</p>
            </Col>
        </Row>
    </Container>
)
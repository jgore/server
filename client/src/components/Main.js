import { Container } from "react-bootstrap";
import React from 'react'
export default (props) => (
    <div className="main">
        <Container>
            {props.children}
        </Container>
    </div>
)
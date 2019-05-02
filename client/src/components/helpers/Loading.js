import { Spinner } from 'react-bootstrap'
import React from 'react'

export default () => (
    <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>
)
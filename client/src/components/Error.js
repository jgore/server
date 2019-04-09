import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

let errors = [
    {
        code: 404,
        description: "Nie ma takiego zasobu"
    },
    {
        code: 500,
        description: "Problem z wysłaniem żądania do serwera, skontaktuj się z administratorem"
    }
]

const Error = ({ errorCode }) => {
    console.log(errorCode)
    return (
        <Jumbotron>
            <h1>Error: {errorCode}</h1>
            <p>
                {
                    errors.find(error => {
                        return error.code === errorCode
                    }).description
                }
            </p>
            <p>
                <Button>Refresh</Button>
            </p>
        </Jumbotron>
    )
}

Error.propTypes = {
    errorCode: PropTypes.number.isRequired
}

export default Error
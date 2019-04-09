import React from 'react'
import { Card, Button, CardDeck } from 'react-bootstrap'
import { PUBLIC_RESOURSES_URL } from '../utils/variables'
import PropTypes from 'prop-types';


class Courses extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Kursy</h1>
                <CardDeck className="section">
                    {
                        this.props.courses.map((value, index) => (
                            <Course
                                key={index}
                                coruse={value}
                            />
                        ))
                    }
                </CardDeck>
            </React.Fragment>
        )
    }
}


const Course = ({ coruse: { title, image, duration, price, shortDescription } }) => (
    <Card border="dark" style={{ minWidth: "40%" }} className="course__card">
        <Card.Img variant="top" src={`${PUBLIC_RESOURSES_URL}/${image}`} />
        <Card.Title>
            <h3>{title}</h3>
        </Card.Title>
        <Card.Body>
            <p>
                <b>Cena</b>: {price}
            </p>
            <p>
                <b>Czas trwania:</b> {duration}
            </p>
            <p>
                <b>Opis:</b> {shortDescription}
            </p>
        </Card.Body>
        <Card.Footer style={{ background: "#343A40" }}>
            <Button variant="warning">Zobacz szczegóły</Button>
            <Button>Opinie</Button>
        </Card.Footer>
    </Card>
)

Courses.propTypes = {
    courses: PropTypes.array.isRequired
}

Course.propTypes = {
    course: PropTypes.exact({
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    })
}


export default Courses

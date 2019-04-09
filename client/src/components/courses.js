import React from 'react'
import { Card, Button, CardDeck } from 'react-bootstrap'
import { PUBLIC_RESOURSES_URL } from '../utils/variables'
import PropTypes from 'prop-types';
import OpinionModal from './modals/OpinionModal';


class Courses extends React.Component {
    state = {
        isModal: false,
        reviews: []
    }

    render() {
        let modalOpen = (reviews) => this.setState({ isModal: true, reviews })
        let modalClose = () => this.setState({ isModal: false })
        return (
            <React.Fragment>
                <h1>Kursy</h1>
                <CardDeck className="section">
                    {
                        this.props.courses.map((value, index) => (
                            <Course
                                key={index}
                                coruse={value}
                                modalOpen={modalOpen}
                                modalClose={modalClose}
                            />
                        ))
                    }
                    {
                        this.state.isModal ?
                            <OpinionModal
                                isModal={this.state.isModal}
                                reviews={this.state.reviews}
                                handleClose={modalClose}
                            /> :
                            ""
                    }
                </CardDeck>
            </React.Fragment>
        )
    }
}


const Course = ({ coruse: { title, image, duration, price, shortDescription, reviews }, modalClose, modalOpen }) => (
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
            <Button onClick={() => modalOpen(reviews)}>Opinie</Button>
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

import React from 'react'
import { Card, Button, Container, CardDeck, Image } from 'react-bootstrap'
import { PUBLIC_RESOURSES_URL } from '../utils/variables'

class Courses extends React.Component {
    render() {
        console.log(this.props)
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

const Course = ({ index, coruse: { title, image, duration, price, shortDescription } }) => (
    <Card style={{ minWidth: "40%" }} className="course__card">
        <Card.Img variant="top" src={`${PUBLIC_RESOURSES_URL}/${image}`} />
        <Card.Title>
            <h3>{title}</h3>
        </Card.Title>
        <Card.Footer style={{ background: "#343A40" }}>
            <Button variant="warning">Zobacz szczegóły</Button>
            <Button>Opinie</Button>
        </Card.Footer>
    </Card>
)

export default Courses

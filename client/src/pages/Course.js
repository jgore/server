import React from 'react'
import Axios from 'axios';
import { PUBLIC_RESOURSES_URL, API_URL } from '../utils/variables';
import { Row, Col, Image, Jumbotron, Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import Stars from '../components/ReactStars'
import { LinkContainer } from 'react-router-bootstrap'
import { GoMegaphone } from "react-icons/go";

class Course extends React.Component {
    state = {
        course: null
    }

    componentDidMount() {
        Axios({
            url: `/api/courses/${this.props.match.params.courseId}`,
            method: "get"
        }).then((res) => {
            console.log(res.data)
            let averageRate = "Brak Opinii"
            for (let i = 0; i < res.data.reviews.length; i++) {
                if (i == 0) {
                    averageRate = res.data.reviews[i].grade
                } else {
                    averageRate += res.data.reviews[i].grade
                }
            }
            res.data.averageRate = averageRate / res.data.reviews.length
            console.log(res.data)
            this.setState({
                course: res.data
            })
        })
    }

    render() {
        return (
            <div className="Course">
                {this.state.course ?
                    <React.Fragment>
                        <Row>
                            <Col sm="12" md="5">
                                <Image
                                    src={`../${PUBLIC_RESOURSES_URL}/${this.state.course.image}`}
                                    fluid
                                />
                            </Col>
                            <Col sm="12" md="7">
                                <h2>{this.state.course.title}</h2>
                                <p><b>Cena:</b> {this.state.course.price}</p>
                                <p><b>Czas trwania:</b>: {this.state.course.duration}</p>
                                <div className="flexible flexible-horizontal-center">
                                    <b>Średnia ocena: </b>
                                    {
                                        this.state.course.averageRate
                                    }
                                    {
                                        typeof this.state.course.averageRate == "number" ?
                                            <Stars
                                                size={20}
                                                className="starses"
                                                count={5} value={this.state.course.averageRate} edit={false}
                                            /> : ""
                                    }
                                </div>
                                <p><b>Opis: </b>{this.state.course.shortDescription}</p>
                                <LinkContainer to="/contact">
                                    <a className="flexible flexible-horizontal-center"><GoMegaphone />Zacznij już dziś !!!</a>
                                </LinkContainer>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Szczegóły</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="5">
                                <Jumbotron fluid className="technologies">
                                    <Container>
                                        <h4>Technologie:</h4>
                                        <ul>
                                            {
                                                this.state.course.technologies.map((value, index) => (
                                                    <React.Fragment key={index}>
                                                        <h6>{value.name}:</h6>
                                                        <ul>
                                                            {this.state.course.technologies[index].technologies.map((technology, index) => (
                                                                <li key={index}>{technology}</li>
                                                            ))}
                                                        </ul>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </ul>
                                    </Container>

                                </Jumbotron>
                            </Col>
                            <Col sm="12" md="7">
                                <div dangerouslySetInnerHTML={{ __html: this.state.course.content }}></div>
                            </Col>
                        </Row>
                    </React.Fragment>
                    :
                    <Loading />
                }
            </div>
        )
    }

}

export default Course
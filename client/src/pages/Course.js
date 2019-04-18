import React from 'react'
import Axios from 'axios';
import { PUBLIC_RESOURSES_URL, API_URL } from '../utils/variables';
import { Row, Col, Image, Jumbotron, Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import Stars from '../components/ReactStars'
import { LinkContainer } from 'react-router-bootstrap'
import { GoMegaphone } from "react-icons/go";
import { Opinion } from '../components/modals/OpinionModal'
import { Toggle } from '../components/Toggle'
import {Video}from '../components/Videos'

class Course extends React.Component {
    state = {
        course: null,
        isDrop: false
    }

    onDropDown() {
        this.setState({
            isDrop: !this.state.isDrop
        })
    }

    componentDidMount() {
        Axios({
            url: `/api/courses/${this.props.match.params.shortTitle}`,
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
                                    <a className="flexible flexible-horizontal-center call-button"><GoMegaphone />Zacznij już dziś !!!</a>
                                </LinkContainer>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Szczegóły</h3>
                            </Col>
                        </Row>
                        <Row>
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
                                <Video video = { this.state.course.video }/>
                                <div className={'border border-primary'} style={{padding: 20 }} dangerouslySetInnerHTML={{ __html: this.state.course.content }}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Opinie</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                {
                                    this.state.course.reviews.length != 0 ?
                                        <Opinion
                                            path={`../${PUBLIC_RESOURSES_URL}/${this.state.course.reviews[0].image}`}
                                            {...this.state.course.reviews[0]}
                                        /> :
                                        ""
                                }
                                {
                                    this.state.course.reviews.length > 0 ?
                                        <React.Fragment>
                                            <Toggle
                                                title={`Rozwiń jeszcze - ${this.state.course.reviews.length - 1} opini`}
                                                titleOnDrop={`Zwiń - ${this.state.course.reviews.length - 1} opini`}
                                                isDrop={this.state.isDrop}
                                                onClick={this.onDropDown.bind(this)}
                                            >
                                                {
                                                    this.state.course.reviews.map((value, index) => (
                                                        <React.Fragment key={index}>
                                                            {
                                                                index != 0 ?
                                                                    <Opinion
                                                                        path={`../${PUBLIC_RESOURSES_URL}/${value.image}`}
                                                                        {...value}
                                                                    /> :
                                                                    ""
                                                            }
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </Toggle>
                                        </React.Fragment> : ""
                                }
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
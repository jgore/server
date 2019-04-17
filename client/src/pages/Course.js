import React from "react";
import Axios from "axios";
import { PUBLIC_RESOURSES_URL, API_URL } from "../utils/variables";
import { Row, Col, Image, Jumbotron, Container, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import Stars from "../components/ReactStars";
import { LinkContainer } from "react-router-bootstrap";
import { GoMegaphone } from "react-icons/go";
import { Opinion } from "../components/modals/OpinionModal";
import { Toggle } from "../components/Toggle";
import { Video } from "../components/Videos";
import { AuthContext } from "../App";
import AddOpinionModal from "../components/modals/AddOpinionModal";
import { MdOpenInNew } from "react-icons/md";

class Course extends React.Component {
  constructor() {
    super();
    this.state = {
      course: null,
      isDrop: false,
      isAddModalOpen: false,
      opinion: {
        grade: 0
      }
    };
    this.ratingChanged = this.ratingChanged.bind(this);
    this.onChangeAddModal = this.onChangeAddModal.bind(this);
    this.onRatingChangeAddModal = this.onRatingChangeAddModal.bind(this);
    this.handleAddModalClose = this.handleAddModalClose.bind(this);
    this.handleAddModalOpen = this.handleAddModalOpen.bind(this);
    this.addOpinion = this.addOpinion.bind(this);
  }

  handleAddModalClose = () => {
    this.setState({
      isAddModalOpen: false
    });
  };

  handleAddModalOpen = () => {
    this.setState({
      isAddModalOpen: true
    });
  };

  onRatingChangeAddModal = newRate => {
    console.log(newRate);
    this.setState({
      ...this.state,
      opinion: {
        ...this.state.opinion,
        grade: newRate
      }
    });
  };

  addOpinion = auth => {
    Axios({
      url: `${API_URL}/api/reviews`,
      method: "POST",
      data: {
        opinion: {
          ...this.state.opinion,
          shortTitle: this.props.match.params.shortTitle,
          googleId: auth.googleId
        }
      }
    })
      .then(res => {
        this.setState({
          ...this.state,
          isAddModalOpen: false,
          opinion: {}
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onDropDown() {
    this.setState({
      isDrop: !this.state.isDrop
    });
  }

  componentDidMount() {
    Axios({
      url: `/api/courses/${this.props.match.params.shortTitle}`,
      method: "get"
    }).then(res => {
      let averageRate = "Brak Opinii";
      for (let i = 0; i < res.data.reviews.length; i++) {
        if (i == 0) {
          averageRate = res.data.reviews[i].grade;
        } else {
          averageRate += res.data.reviews[i].grade;
        }
      }
      if (typeof averageRate == "number") {
        res.data.averageRate = averageRate / res.data.reviews.length;
      } else {
        res.data.averageRate = averageRate;
      }
      this.setState({
        course: res.data
      });
    });
  }

  ratingChanged(newRating) {
    console.log(newRating);
    this.setState({
      opinion: {
        ...this.state.opinion,
        grade: newRating
      }
    });
  }

  onChangeAddModal(e) {
    console.log(e.target.value);
    this.setState({
      ...this.state,
      opinion: {
        ...this.state.opinion,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ auth }) => (
          <div className="Course">
            {this.state.course ? (
              <React.Fragment>
                <Row>
                  <Col sm="12" md="5">
                    <Image
                      src={`../${PUBLIC_RESOURSES_URL}/${
                        this.state.course.image
                      }`}
                      fluid
                    />
                  </Col>
                  <Col sm="12" md="7">
                    <h2>{this.state.course.title}</h2>
                    <p>
                      <b>Cena:</b> {this.state.course.price}
                    </p>
                    <p>
                      <b>Czas trwania:</b>: {this.state.course.duration}
                    </p>
                    <div className="flexible flexible-horizontal-center">
                      <b>Średnia ocena: </b>
                      {this.state.course.averageRate}
                      {typeof this.state.course.averageRate == "number" ? (
                        <React.Fragment>
                          <Stars
                            size={20}
                            className="starses"
                            count={5}
                            value={this.state.course.averageRate}
                            edit={false}
                          />
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                    <p>
                      <b>Opis: </b>
                      {this.state.course.shortDescription}
                    </p>
                    <LinkContainer to="/contact">
                      <a className="flexible flexible-horizontal-center call-button">
                        <GoMegaphone />
                        Zacznij już dziś !!!
                      </a>
                    </LinkContainer>
                    {auth ? (
                      <React.Fragment>
                        <Button
                          size="lg"
                          style={{
                            marginLeft: "0.5rem",
                            marginTop: "1rem",
                            fontSize: "26px",
                            fontWeight: "500"
                          }}
                          onClick={this.handleAddModalOpen.bind(this)}
                          variant="success"
                        >
                          <MdOpenInNew />
                          Dodaj Opinię
                        </Button>
                        <AddOpinionModal
                          handleClose={this.handleAddModalClose}
                          isOpen={this.state.isAddModalOpen}
                          onChange={this.onChangeAddModal}
                          onRatingChange={this.onRatingChangeAddModal}
                          grade={this.state.opinion.grade}
                          addOpinion={this.addOpinion}
                          auth={auth}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3>Szczegóły</h3>
                  </Col>
                </Row>
                <Row />
                <Row>
                  <Col sm="12" md="5">
                    <Jumbotron fluid className="technologies">
                      <Container>
                        <h4>Technologie:</h4>
                        <ul>
                          {this.state.course.technologies.map(
                            (value, index) => (
                              <React.Fragment key={index}>
                                <h6>{value.name}:</h6>
                                <ul>
                                  {this.state.course.technologies[
                                    index
                                  ].technologies.map((technology, index) => (
                                    <li key={index}>{technology}</li>
                                  ))}
                                </ul>
                              </React.Fragment>
                            )
                          )}
                        </ul>
                      </Container>
                    </Jumbotron>
                  </Col>
                  <Col sm="12" md="7">
                    <Video video={this.state.course.video} />
                    <div
                      className={"border border-primary"}
                      style={{ padding: 20 }}
                      dangerouslySetInnerHTML={{
                        __html: this.state.course.content
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3>Opinie</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    {this.state.course.reviews.length != 0 ? (
                      <Opinion
                        path={`../${PUBLIC_RESOURSES_URL}/${
                          this.state.course.reviews[0].user.image
                        }`}
                        {...this.state.course.reviews[0]}
                      />
                    ) : (
                      ""
                    )}
                    {this.state.course.reviews.length > 0 ? (
                      <React.Fragment>
                        <Toggle
                          title={`Rozwiń jeszcze - ${this.state.course.reviews
                            .length - 1} opini`}
                          titleOnDrop={`Zwiń - ${this.state.course.reviews
                            .length - 1} opini`}
                          isDrop={this.state.isDrop}
                          onClick={this.onDropDown.bind(this)}
                        >
                          {this.state.course.reviews.map((value, index) => (
                            <React.Fragment key={index}>
                              {index != 0 ? (
                                <Opinion
                                  path={`../${PUBLIC_RESOURSES_URL}/${
                                    value.user.image
                                  }`}
                                  {...value}
                                />
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          ))}
                        </Toggle>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </React.Fragment>
            ) : (
              <Loading />
            )}
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Course;

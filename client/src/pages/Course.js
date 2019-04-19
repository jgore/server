import React from "react";
import Axios from "axios";
import {PUBLIC_RESOURSES_URL} from "../utils/variables";
import {Button, Col, Container, Image, Jumbotron, Row} from "react-bootstrap";
import Loading from "../components/Loading";
import Stars from "../components/ReactStars";
import {LinkContainer} from "react-router-bootstrap";
import {GoMegaphone} from "react-icons/go";
import {Opinion} from "../components/modals/OpinionModal";
import {Toggle} from "../components/Toggle";
import {Video} from "../components/Videos";
import {AuthContext} from "../App";
import AddOpinionModal from "../components/modals/AddOpinionModal";
import {MdOpenInNew} from "react-icons/md";

class Course extends React.Component {
  constructor() {
    super();
    this.state = {
      course: null,
      isDrop: false,
      isAddModalOpen: false,
      opinion: {
        grade: 0,
        content: ""
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

  addOpinion = (auth, logout) => {
    console.log(this.state.opinion);
    let ask;
    if (this.state.isReviewed) {
      ask = Axios({
        url: `/api/courses/${this.props.match.params.shortTitle}`,
        method: "PUT",
        data: {
          opinion: {
            ...this.state.opinion
          }
        },
        headers: {
          token: auth.token
        }
      }).then(res => {
        let averageRate = "Brak opinii";
        for (let i = 0; i < res.data.reviews.length; i++) {
          if (i === 0) {
            averageRate = res.data.reviews[i].grade;
          } else {
            averageRate += res.data.reviews[i].grade;
          }
        }

        if (typeof averageRate === "number") {
          averageRate = averageRate / res.data.reviews.length;
        }
        this.setState({
          ...this.state,
          isAddModalOpen: false,
          course: {
            ...this.state.course,
            averageRate,
            reviews: res.data.reviews
          }
        });
      });
    } else {
      ask = Axios({
        url: `/api/reviews`,
        method: "POST",
        data: {
          opinion: {
            ...this.state.opinion,
            shortTitle: this.props.match.params.shortTitle
          }
        },
        headers: {
          token: auth.token
        }
      }).then(res => {
        let averageRate = "Brak Opinii";
        for (let i = 0; i < res.data.course.reviews.length; i++) {
          if (i === 0) {
            averageRate = res.data.course.reviews[i].grade;
          } else {
            averageRate += res.data.course.reviews[i].grade;
          }
        }
        if (typeof averageRate === "number") {
          res.data.course.averageRate =
            averageRate / res.data.course.reviews.length;
        } else {
          res.data.course.averageRate = averageRate;
        }
        this.setState({
          ...this.state,
          isAddModalOpen: false,
          isReviewed: true,
          course: res.data.course
        });
      });
    }
    ask.catch(err => {
      if (err.response.status === 401) {
        logout();
      }
    });
  };

  onDropDown() {
    this.setState({
      isDrop: !this.state.isDrop
    });
  }

  componentDidMount() {
    let ask;
    if (localStorage.getItem("token")) {
      ask = Axios({
        url: `/api/courses/${this.props.match.params.shortTitle}`,
        method: "get",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.isReviewed) {
          this.setState({
            opinion: {
              ...res.data.opinion.reviews,
              _id: res.data.opinion._id
            }
          });
        }
        return res;
      });
    } else {
      ask = Axios({
        url: `/api/courses/${this.props.match.params.shortTitle}`,
        method: "get"
      });
    }
    ask.then(res => {
      console.log(res.data);
      let averageRate = "Brak Opinii";
      for (let i = 0; i < res.data.course.reviews.length; i++) {
        if (i === 0) {
          averageRate = res.data.course.reviews[i].grade;
        } else {
          averageRate += res.data.course.reviews[i].grade;
        }
      }
      if (typeof averageRate === "number") {
        res.data.course.averageRate =
          averageRate / res.data.course.reviews.length;
      } else {
        res.data.course.averageRate = averageRate;
      }
      console.log(this.state.opinion, 153);
      this.setState({
        ...this.state,
        course: res.data.course,
        isReviewed: res.data.isReviewed
      });
    }).catch(err => {
      if(err.response.status === 401) {
        localStorage.removeItem("token")
      }
    })
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
        {({ auth, logout }) => (
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
                      {typeof this.state.course.averageRate === "number" ? (
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
                            fontWeight: "500",
                            boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.75)"
                          }}
                          onClick={this.handleAddModalOpen.bind(this)}
                          variant="success"
                        >
                          <MdOpenInNew />
                          {this.state.isReviewed
                            ? "Edytuj Opinię"
                            : "Dodaj Opinię"}
                        </Button>
                        <AddOpinionModal
                          handleClose={this.handleAddModalClose}
                          isOpen={this.state.isAddModalOpen}
                          onChange={this.onChangeAddModal}
                          onRatingChange={this.onRatingChangeAddModal}
                          grade={this.state.opinion.grade}
                          addOpinion={this.addOpinion}
                          auth={auth}
                          logout={logout}
                          isReviewed={this.state.isReviewed}
                          review={this.state.opinion}
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
                    {this.state.course.reviews.length !== 0 ? (
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
                              {index !== 0 ? (
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

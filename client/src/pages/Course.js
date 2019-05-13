import React from "react";
import Axios from "axios";
import { Col, Row } from "react-bootstrap";
import Loading from "../components/helpers/Loading";
import { AuthContext } from "../App";
import CourseOverview from "../components/sections/course-page/CourseOverview";
import CourseDetails from "../components/sections/course-page/CourseDetails";
import { withRouter } from "react-router-dom";
import Comments from "../components/sections/course-page/Comments";

class Course extends React.Component {
  constructor() {
    super();
    this.state = {
      course: null,
      isDrop: false,
      isAddModalOpen: false,
      isOpinionModalOpen: false,
      opinion: {
        grade: 0,
        content: ""
      }
    };
    this.ratingChanged = this.ratingChanged.bind(this);
    this.onChangeAddModal = this.onChangeAddModal.bind(this);
    this.onRatingChangeAddModal = this.onRatingChangeAddModal.bind(this);
    this.handleOpinionModalClose = this.handleOpinionModalClose.bind(this);
    this.handleAddModalOpen = this.handleAddModalOpen.bind(this);
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

  handleOpinionModalClose = () => {
    this.setState({
      isOpinionModalOpen: false
    });
  };

  handleOpinionModalOpen = () => {
    this.setState({
      isOpinionModalOpen: true
    });
  };

  onRatingChangeAddModal = newRate => {
    this.setState({
      ...this.state,
      opinion: {
        ...this.state.opinion,
        grade: newRate
      }
    });
  };

  addOpinion = (auth, logout) => {
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
    ask
      .then(res => {
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
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload()
        } else if (err.response.status === 404) {
          console.log("asd");
          console.log();
          this.props.history.replace("/notFound");
        }
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
    console.log(this.state.course);
    return (
      <AuthContext.Consumer>
        {({ auth, logout }) => (
          <div className="Course">
            {this.state.course ? (
              <React.Fragment>
                <CourseOverview
                  course={this.state.course}
                  isReviewed={this.state.isReviewed}
                  isAddModalOpen={this.state.isAddModalOpen}
                  opinion={this.state.opinion}
                  auth={auth}
                  logout={logout}
                  addOpinionModalEvents={{
                    handleAddModalOpen: this.handleAddModalOpen,
                    handleAddModalClose: this.handleAddModalClose,
                    onChangeAddModal: this.onChangeAddModal,
                    onRatingChangeAddModal: this.onRatingChangeAddModal,
                    addOpinion: this.addOpinion
                  }}
                  opinionModalEvents={{
                    handleOpinionModalOpen: this.handleOpinionModalOpen,
                    handleOpinionModalClose: this.handleOpinionModalClose,
                    isOpinionModalOpen: this.state.isOpinionModalOpen
                  }}
                />
                <CourseDetails course={this.state.course} />
                <Row>
                  <Col>
                    <h3>Komentarze</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="comments">
                    <Comments comments={this.state.course.comments} shortTitle={this.state.course.shortTitle}/>
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

export default withRouter(Course);

import React from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import { AuthContext } from "../../App";

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      error: null
    };
    this.addComment = this.addComment.bind(this);
  }

  addComment(auth, logout) {
    console.log(this.props, this.state);
    if (this.state.content && this.state.content.length !== 0) {
      Axios({
        url: `/api/comments`,
        method: "POST",
        data: {
          opinion: {
            shortTitle: this.props.shortTitle,
            content: this.state.content
          }
        },
        headers: {
          token: auth.token
        }
      })
        .then(res => {
          this.setState({
            content: "",
            error: null
          });
          this.props.refreshComments(res.data.course.comments);
        })
        .catch(err => {
          console.log(err);
          if (err.response.status === 401) {
            logout();
          }
        });
    } else {
      console.log("asdasdas");
      this.setState({
        error: "To pole jest wymagane"
      });
      process.nextTick(() => {
        console.log(this.state);
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    process.nextTick(() => {
      if (!this.state.content) {
        if (this.state.content.length === 0) {
          this.setState({
            error: "To pole jest wymagane"
          });
        } else {
          this.setState({
            error: "To pole jest wymagane"
          });
        }
      }
    });
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ auth, logout }) => (
          <React.Fragment>
            {auth.token ? (
              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                style={{
                  borderBottom: "1px solid gray",
                  paddingBottom: "2rem",
                  marginBottom: 0
                }}
              >
                <Form.Label>Twój komentarz</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="6"
                  style={{ resize: "none !important", marginBottom: 20 }}
                  placeholder="To jest miejsce na twój komentarz..."
                  onChange={this.onChange.bind(this)}
                  style={{ marginBottom: 10 }}
                  name="content"
                  value={this.state.content}
                />
                <span
                  style={{ display: "block", marginBottom: 20, color: "red" }}
                >
                  {this.state.error}
                </span>
                <Button
                  onClick={() => this.addComment(auth, logout)}
                  variant="primary"
                >
                  Opublikuj
                </Button>
              </Form.Group>
            ) : (
              <h6>Musisz być zalogowanym, aby dodać komentarz</h6>
            )}
          </React.Fragment>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default AddComment;

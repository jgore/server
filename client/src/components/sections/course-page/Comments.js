import React from "react";
import { Image, Button, Modal } from "react-bootstrap";
import AddComment from "../../forms/AddComment";
import { AuthContext } from "../../../App";
import Axios from "axios";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      isDeleteModalOpen: false,
      toDelete: {}
    };
  }

  componentDidMount() {
    this.setState({
      comments: this.props.comments
    });
  }

  changeDeleteModalOpen(state, data = {}) {
    return () => {
      this.setState({
        isDeleteModalOpen: state,
        toDelete: data
      });
    };
  }

  deleteComment({ _id, logout, auth, shortTitle }) {
    Axios({
      url: `/api/comments/delete`,
      method: "POST",
      data: {
        shortTitle,
        _id
      },
      headers: {
        token: auth.token
      }
    })
      .then(res => {
        let array = this.state.comments.filter(comment => {
          return comment._id !== _id;
        });
        this.setState({
          comments: array
        });
      })
      .catch(err => {
        if (err.status === 304) {
          window.location.reload();
        } else if (err.status === 401) {
          logout();
        } else {
          window.location.reload();
        }
      });
    this.changeDeleteModalOpen(false)();
  }

  refreshComments(comments) {
    this.setState({
      comments
    });
  }

  render() {
    return (
      <React.Fragment>
        <AddComment
          shortTitle={this.props.shortTitle}
          refreshComments={this.refreshComments.bind(this)}
        />
        <AuthContext.Consumer>
          {({ auth, logout }) => (
            <React.Fragment>
              {this.state.comments.map((value, index) => {
                if (auth && auth.name === value.user.name) {
                  return (
                    <Comment
                      key={index}
                      comment={value}
                      isCancel={true}
                      onClose={this.changeDeleteModalOpen(true, {
                        _id: value._id,
                        logout,
                        auth,
                        shortTitle: this.props.shortTitle
                      })}
                    />
                  );
                }
                return <Comment key={index} comment={value} />;
              })}
              <Modal
                show={this.state.isDeleteModalOpen}
                onHide={this.changeDeleteModalOpen(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Czy na pewno chcesz usunąć ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => this.deleteComment(this.state.toDelete)}
                  >
                    Usuń
                  </Button>
                  <Button
                    variant="primary"
                    onClick={this.changeDeleteModalOpen(false)}
                  >
                    Zamknij
                  </Button>
                </Modal.Footer>
              </Modal>
            </React.Fragment>
          )}
        </AuthContext.Consumer>
      </React.Fragment>
    );
  }
}

const Comment = ({
  comment: {
    user: { image, name },
    content
  },
  isCancel = false,
  onClose
}) => (
  <div className="comment">
    <img src={`../img/${image}`} />
    <div className="comment-content">
      <h6 style={{ marginTop: "0.5rem" }}>{name}</h6>
      <p style={{ maxWidth: "70vw" }}>{content}</p>
      {isCancel ? (
        <img
          src="../img/cancel.svg"
          className="cancel"
          onClick={() => onClose()}
        />
      ) : (
        ""
      )}
    </div>
  </div>
);

import React from "react";
import { Image, Button } from "react-bootstrap";
import AddComment from "../../forms/AddComment";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    this.setState({
      comments: this.props.comments
    });
  }

  refreshComments(comments) {
    this.setState({
      comments
    });
  }

  render() {
    console.log(this.props.comments);
    return (
      <React.Fragment>
        <AddComment
          shortTitle={this.props.shortTitle}
          refreshComments={this.refreshComments.bind(this)}
        />
        {this.state.comments.map((value, index) => (
          <Comment key={index} comment={value} />
        ))}
      </React.Fragment>
    );
  }
}

const Comment = ({
  comment: {
    user: { image, name },
    content
  }
}) => (
  <div className="comment">
    <img src={`../img/${image}`} />
    <div className="comment-content">
      <h6 style={{ marginTop: "0.5rem" }}>{name}</h6>
      <p style={{ maxWidth: "60vw", textAlign: "justify" }}>{content}</p>
    </div>
  </div>
);

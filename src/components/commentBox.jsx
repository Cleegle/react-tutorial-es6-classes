import React, { Component } from 'react';
import request from 'superagent';

import CommentForm from './commentForm';
import CommentList from './commentList';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = { data: [] };

    this.loadCommentsRequest = this.loadCommentsRequest.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  loadCommentsRequest() {
    request
      .get(this.props.url)
      .end((err, res) => {
        if (!err && res.statusCode === 200) {
          this.setState({data: res.body});
        } else {
          console.log(this.props.url, res.status, err);
        }
      });
  }

  handleCommentSubmit(comment) {
    let comments = this.state.data;

    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({data: newComments});

    request
      .post(this.props.url)
      .send(comment)
      .end((err, res) => {
        if (!err && res.statusCode === 200) {
          this.setState({data: res.body});
        } else {
          this.setState({data: comments});
          console.log(this.props.url, res.status, err);
        }
      });
  }

  componentDidMount() {
    this.loadCommentsRequest();
    setInterval(this.loadCommentsRequest, this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

export default CommentBox;

import React, { Component } from 'react';
import CommentBox from './components/commentBox';

import styles from './style.scss';

class App extends Component {
  render() {
    return (
      <CommentBox url="/api/comments" pollInterval={2000} />
    );
  }
};

export default App;

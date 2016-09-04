import React, {Component} from 'react';
import Widget from './widget.jsx'

class ActivePlaylist extends Component {
  render() {
    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2'>
        <Widget/>
      </div>  
    );
  }
}
export default ActivePlaylist;

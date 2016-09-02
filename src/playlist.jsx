import React, {Component} from 'react';
// import Wi from './playlist.jsx';

class Playlist extends Component {
  render() {
    return (
      <h>{this.props.playlist.name}</h>
      
    );
  }
}
export default Playlist;
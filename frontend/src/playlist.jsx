import React, {Component} from 'react';
import WidgetIcon from './widget_icon.jsx';

class Playlist extends Component {
  render() {
    return (
      <div className='playlist'>
        <h>{this.props.playlist.name}</h>
        <WidgetIcon/>
      </div>
      
    );
  }
}
export default Playlist;
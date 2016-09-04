import React, {Component} from 'react';
import Widget from './widget.jsx'



class ActivePlaylist extends Component {

  handleAddWidget(){
    
  }

  render() {
    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2'>
        <button onClick={this.handleAddWidget.bind(this)}>Add Widget</button>
        <Widget/>
      </div>  
    );
  }
}
export default ActivePlaylist;

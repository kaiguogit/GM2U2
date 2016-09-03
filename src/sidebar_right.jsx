import React, {Component} from 'react';
import Playlist from './playlist.jsx';

class SidebarRight extends Component {
  render() {
    return (
      <div id="sidebar_right" className={this.props.open ? '' : 'hidden'}>    
        {
          this.props.playlists.map(function(playlist){
            return <Playlist playlist={playlist} key={playlist.id}/>
          }) 
        }
      </div>
      
    );
  }
}
export default SidebarRight;

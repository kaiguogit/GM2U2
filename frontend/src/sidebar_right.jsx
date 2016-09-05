import React, {Component} from 'react';
import Playlist from './playlist.jsx';

class SidebarRight extends Component {
  

  render() {
    return (
      <div id="sidebar_right" className={this.props.open ? '' : 'hidden'}>    
        <button onClick={this.props.onAddPlaylist}>Add Playlist</button>
        {
          this.props.playlists.map(function(playlist){
            return (
              <Playlist 
                onSelectPlaylist={this.props.onSelectPlaylist} 
                onDeletePlaylist={this.props.onDeletePlaylist} 
                playlist={playlist} 
                key={playlist.id}
              />  
            )
          }.bind(this)) 
        }
      </div>
      
    );
  }
}
export default SidebarRight;

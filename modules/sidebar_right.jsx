import React, {Component} from 'react';
import Playlist from './playlist.jsx';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

class SidebarRight extends Component {

  render() {
    return (
      <div>
        
        <Drawer 
          docked={false}
          width={200} 
          openSecondary={true} 
          open={this.props.open} 
          onRequestChange={(open) => {
            this.props.toggleSidebarRight();
            } 
          }
        >
          <AppBar title="Playlists" />

          <button onClick={this.props.onAddPlaylist}>Add Playlist</button>
          {
            this.props.playlists.map(function(playlist){
              return (
                <Playlist 
                  onTouchTap={this.handleClose}
                  onSelectPlaylist={this.props.onSelectPlaylist} 
                  onDeletePlaylist={this.props.onDeletePlaylist} 
                  playlist={playlist} 
                  key={playlist.id}
                />  
              )
            }.bind(this)) 
          }
        </Drawer>
      </div>
    );
  }
}
export default SidebarRight;

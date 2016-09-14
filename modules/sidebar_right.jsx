import React, {Component} from 'react';
import Playlist from './playlist.jsx';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

class SidebarRight extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('sidebar active playlist is:', this.props.activePlaylist)     
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('sidebar active playlist is:', this.props.activePlaylist)     
  }

  render() {
    return (
      <div>
        
        <Drawer 
          docked={false}
          width={250} 
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
                  activePlaylist = {this.props.activePlaylist}
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

import React, {Component} from 'react';
import Playlist from './playlist.jsx';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  float: 'right',
  marginTop: 5,
  marginRight: 20,
};

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
    var playlists = this.props.playlists
    var sortedPlaylists = playlists.sort(function(a,b){
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    
    return (
      <div>
        
        <Drawer 
          className = "sidebar_playlists"
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
          {
            sortedPlaylists.map(function(playlist){
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
          <FloatingActionButton 
            mini={true} 
            style={style} 
            onClick={this.props.onAddPlaylist}       
          >
            <ContentAdd />
          </FloatingActionButton>
        </Drawer>
      </div>
    );
  }
}
export default SidebarRight;

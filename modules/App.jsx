import React, {Component} from 'react';
import Navbar from "./navbar.jsx";
import SidebarLeft from "./sidebar_left.jsx";
import SidebarRight from "./sidebar_right.jsx";
import ActivePlaylist from './active_playlist.jsx';
import Footer from './footer.jsx';
import Login from './Login.jsx';

//Drag and drop
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//material
import RaisedButton from 'material-ui/RaisedButton';

//For raise button
const raisedButtonStyle = {
  margin: 12,
};

const styles={
  app:{
    backgroundColor: '#ddd'
  },
  frontPage:{
    height:'800px',
    backgroundImage: 'url(/images/background-header.jpg)',
    color: "white",
  },
  frontTitle:{
    fontSize:'50px'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uiState: { sidebarLeftOpen: false, sidebarRightOpen: false },
      username: window.localStorage.username,
      phoneNumber: window.localStorage.phoneNumber,
      playlists: [],
      activePlaylist: null
    }
  }

  getChildContext() {
    return {
      username: this.state.username, 
      phoneNumber: this.state.phoneNumber,
      activePlaylist: this.state.activePlaylist
    };
  }

  toggleSidebarLeft() {
    this.setState({
      uiState: {
        sidebarLeftOpen: !this.state.uiState.sidebarLeftOpen
      }
    })
  }

  toggleSidebarRight() {
    console.log('toggleSidebarRight')
    this.setState({
      uiState: {
        sidebarRightOpen: !this.state.uiState.sidebarRightOpen
        // sidebarLeftOpen: false,
      }
    })
  }

  loggedIn(user){
    this.setState({
      username: user.name,
    });

    this.updatePlaylist();
    // window.location.reload();
  }

  loggedOut(){
    this.setState({
      username: null
    });
  }

  addPlaylist(){
    console.log("Adding App playlists");
    $.ajax({
        url: `${process.env.host}/api/playlists`,
        method: "post",
        headers: {
        'Authorization':  "Bearer " + window.localStorage.token
        }
      })
      .then(function(playlist) {
        console.log("New Playlist is", playlist);
        this.updatePlaylist();
      }.bind(this));
  }

  updatePlaylist(){
    console.log("Updating App playlists");
    $.ajax({
        url: `${process.env.host}/api/playlists`,
        method: "get",
        headers: {
        'Authorization':  "Bearer " + window.localStorage.token
        }
      })
      .then(function(playlists) {
        console.log("Playlists is", playlists);
        this.setState({playlists: playlists});
        //set default active playlist
        if( !this.state.activePlaylist && this.state.playlists.length > 0 ){
          this.setState({activePlaylist: this.state.playlists[0]})
        }

        //update the ActivePlaylist
        this.selectPlaylist(this.state.activePlaylist.id);
      }.bind(this));
  }
  
  updatePhoneNumber(phoneNumber){
    $.ajax({
      url: `${process.env.host}/phone`,
      method: "post",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      },
      data: {phoneNumber: phoneNumber}
    }).done(function(response){
      console.log("uploadedPhoneNumber, response is", response);
      window.localStorage.phoneNumber = response.user.phoneNumber;
      this.setState({phoneNumber : response.user.phoneNumber});
      Materialize.toast(`Phone number has changed to ${response.user.phoneNumber}`, 4000,'',function(){})
    }.bind(this)).fail(function(err){
      console.log("failed to uploadPhoneNumber, error is", err);
    });
  }

  deletePlaylist(id){
    console.log("Updating App playlists");
    $.ajax({
        url: `${process.env.host}/api/playlists/${id}`,
        method: "delete",
        headers: {
        'Authorization':  "Bearer " + window.localStorage.token
        }
      })
      .then(function(message) {
        console.log("Delete playlist message is", message);
        this.updatePlaylist();
      }.bind(this));
  }

  selectPlaylist(id){
    console.log("select playlist");
    this.state.playlists.forEach(function(playlist){
      if(playlist.id === id){
        this.setState({activePlaylist: playlist})
      }
    }.bind(this));
  }
  componentDidMount() {
    console.log('App mounted');
    
    if(this.state.username){
      console.log("Getting all playlists to App component");
      this.updatePlaylist();
    }

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      }
    );

    console.log("!!!!!!!!!host in env is"+ process.env.host);
  };

  onSignIn(googleUser) {
    console.log("launched");
    console.log(googleUser);
    var profile = googleUser.getBasicProfile();
    console.log(profile);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('FamilyName: ' + profile.getFamilyName());
    console.log('GivenName: ' + profile.getGivenName());
  }

  render() {
    return (
      <div style={styles.app}>
        {/* Navbar */}                
        <Navbar 
          toggleSidebarLeft={this.toggleSidebarLeft.bind(this)} 
          toggleSidebarRight={this.toggleSidebarRight.bind(this)} 
          loggedOut={this.loggedOut.bind(this)}
        />

        {!this.state.username &&
          <div style={styles.frontPage}>
            <div className="center-align" style={styles.frontTitle}>
              A Morning Alarm that can talk to you.
            </div>
            <div >
              <Login loggedIn={this.loggedIn.bind(this)}/>
            </div>
          </div>
        }

        {this.state.username &&
          <div className="row">
            {/* sidebar left - widgets */}
            <SidebarLeft 
              open={this.state.uiState.sidebarLeftOpen} 
              toggleSidebarLeft={this.toggleSidebarLeft.bind(this)}
              className='customSidebarLeft'
            />


            {/*If Playlist is []*/}
            {this.state.playlists && this.state.playlists.length === 0 &&
              <div className = 'col s12 m10 offset-m1 l8 offset-l2'>
                <RaisedButton 
                  onClick={this.addPlaylist.bind(this)} 
                  label="Add playlist" primary={true} 
                  style={raisedButtonStyle} />
              </div>
            }

            {/* sidebar right - playlists */}
            {this.state.playlists && this.state.playlists.length > 0 && 
              <SidebarRight 
                onAddPlaylist={this.addPlaylist.bind(this)} 
                onDeletePlaylist={this.deletePlaylist.bind(this)} 
                toggleSidebarRight={this.toggleSidebarRight.bind(this)} 
                open={this.state.uiState.sidebarRightOpen} 
                playlists={this.state.playlists}                
                onSelectPlaylist={this.selectPlaylist.bind(this)}
                activePlaylist={this.state.activePlaylist}
              />
            }

            {/* centered content - active playlist */}

            {this.state.activePlaylist && 
              <ActivePlaylist 
                playlist={this.state.activePlaylist} 
                id={this.state.activePlaylist.id} 
                onPlaylistChange={this.updatePlaylist.bind(this)}
                updatePhoneNumber={this.updatePhoneNumber.bind(this)} 
              />
            }          
            
          </div>
        }

      </div>
    );
  }
}

App.childContextTypes = {
  username: React.PropTypes.string,
  phoneNumber: React.PropTypes.string,
  activePlaylist: React.PropTypes.object
};
export default DragDropContext(HTML5Backend)(App);

import React, {Component} from 'react';
import Navbar from "./navbar.jsx";
import SidebarLeft from "./sidebar_left.jsx";
import SidebarRight from "./sidebar_right.jsx";
import ActivePlaylist from './active_playlist.jsx';
import Footer from './footer.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {uiState: { sidebarLeftOpen: false, sidebarRightOpen: false }}
  }

  toggleSidebarLeft() {
    this.setState({
      uiState: {
        sidebarLeftOpen: !this.state.uiState.sidebarLeftOpen,
        sidebarRightOpen: false,
      }
    })
  }

  toggleSidebarRight() {
    this.setState({
      uiState: {
        sidebarRightOpen: !this.state.uiState.sidebarRightOpen,
        sidebarLeftOpen: false,
      }
    })
  }

  componentDidMount() {
    console.log('App mounted');
    $.getJSON("http://localhost:3000/api/playlists")
    .then(function(playlists) {
      console.log("Playlists is", playlists);
      this.setState({playlists: playlists})
    }.bind(this));
  };
  render() {
    return (
      <div>
        {/* Navbar */}        
        <Navbar toggleSidebarLeft={this.toggleSidebarLeft.bind(this)} toggleSidebarRight={this.toggleSidebarRight.bind(this)} />
        <div className="row">
          {/* sidebar left - widgets */}
          <SidebarLeft open={this.state.uiState.sidebarLeftOpen} />
          {/* sidebar right - playlists */}
          { !this.state.playlists &&
            <div><h1>...loadding</h1></div>
          }
          { this.state.playlists &&
          <SidebarRight open={this.state.uiState.sidebarRightOpen} playlists={this.state.playlists}/>
          }
          {/* centered content - active playlist */}
          <ActivePlaylist/>
        </div>
        {/* Footer */}
        <Footer/>
      </div>
    );
  }
}
export default App;

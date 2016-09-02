import React, {Component} from 'react';
import Navbar from "./navbar.jsx";
import SidebarLeft from "./sidebar_left.jsx";
import SidebarRight from "./sidebar_right.jsx";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {uiState: { leftSidebarOpen: false, rightSidebarOpen: false }}
  }

  toggleLeftSidebar() {
    this.setState({
      uiState: {
        leftSidebarOpen: !this.state.uiState.leftSidebarOpen,
        rightSidebarOpen: false,
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
        <Navbar toggleLeftSidebar={this.toggleLeftSidebar.bind(this)} />
        <div className="row">
          <SidebarLeft open={this.state.uiState.leftSidebarOpen} />
          { !this.state.playlists &&
            <div><h1>...loadding</h1></div>
          }
          { this.state.playlists &&
            <SidebarRight playlists={this.state.playlists}/>
          }
        </div>
      </div>
    );
  }
}
export default App;

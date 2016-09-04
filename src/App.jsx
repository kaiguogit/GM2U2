import React, {Component} from 'react';
import Navbar from "./navbar.jsx";
import SidebarLeft from "./sidebar_left.jsx";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uiState: { 
        leftSidebarOpen: false, 
        rightSidebarOpen: false 
      },
      username: window.localStorage.username
    }
  }

  getChildContext() {
    return {username: this.state.username};
  }

  toggleLeftSidebar() {
    this.setState({
      uiState: {
        leftSidebarOpen: !this.state.uiState.leftSidebarOpen,
        rightSidebarOpen: false,
      },
      username: this.state.username
    })
  }

  loggedIn(username){
    this.setState({
      uiState: this.state.uiState,
      username: username
    }, function(){
      console.log("App\s state is updated. username is", this.state.username);
      // console.log("context object is", getChildContext())
    })
  }

  componentDidMount() {
    console.log('App mounted');
    
    if(this.state.username){
      console.log("Sending Ajax");
      $.ajax({
        url: "http://localhost:3000/api/playlists",
        method: "get",
        headers: {
        'Authorization':  "Bearer " + window.localStorage.token
        }
      })
      .then(function(playlists) {
        console.log("Playlists is", playlists);
        this.setState({playlists: playlists})
      }.bind(this));
    }

  };
  render() {
    return (
      <div>
        <Navbar toggleLeftSidebar={this.toggleLeftSidebar.bind(this)} loggedIn={this.loggedIn.bind(this)} />
        <div className="row">
          <SidebarLeft open={this.state.uiState.leftSidebarOpen} />
          
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  username: React.PropTypes.string
};
export default App;

import React, {Component} from 'react';
import $ from 'jquery';
import Login from './Login.jsx';

class Navbar extends Component {
  handleLogOut(e){
    e.preventDefault();
    window.localStorage.clear();
    console.log("In handleLogout this is ", this);
    this.props.loggedIn(null);
  }
  render() {
    return (      
      <div className='navbar-fixed'>
        <nav>
          {/* logo centered */}
          <a href="#" className="brand-logo center"> G&apos;Morning!</a>    
          {/*  align-left items*/} 
          <ul className="left hide-on-small-only"> {/* on regular screens */}
            <li><a href="#" onClick={this.props.toggleLeftSidebar} className='button_slider_widgets'><i className="material-icons left">library_add</i>Widgets</a></li>      
            <li><a href="#"><i className="material-icons left">shop</i>Store</a></li>      
          </ul>
          <ul className="left hide-on-med-and-up"> {/* on mobile screens */}
            <li><a href="#" onClick={this.props.toggleLeftSidebar} className='button_slider_widgets'><i className="material-icons">library_add</i></a></li>      
            <li><a href="#"><i className="material-icons">shop</i></a></li>      
          </ul>
            {console.log("Context is", this.context)}
            {console.log("Context username is", this.context.username)}
            {this.context.username &&
              <div>
                <ul className="right hide-on-small-only"> {/* on regular screens */}
                  <li><a href="#"><i className="material-icons left">person_pin</i>{this.context.username}</a></li>
                  <li><a href="#" className='button_slider_playlists'><i className="material-icons left">video_library</i>Playlists</a></li>
                  <li><a href="#" onClick={this.handleLogOut.bind(this)}>Logout</a></li>
                </ul>
                <ul className="right hide-on-med-and-up"> {/* on mobile screens */}
                  <li><a href="#"><i className="material-icons">person_pin</i>{this.context.username}</a></li>      
                  <li><a href="#" className='button_slider_playlists'><i className="material-icons">video_library</i></a></li>      
                  <li><a href="#" onClick={this.handleLogOut.bind(this)}>Logout</a></li>
                </ul>
              </div>
            }
            {!this.context.username &&
              <div>
                <ul className="right hide-on-small-only"> {/* on regular screens */}
                  <li><a href="#"><i className="material-icons left">person_pin</i>Guest</a></li>
                  <li><a href="#" className='button_slider_playlists'><i className="material-icons left">video_library</i>Playlists</a></li>
                  <li><Login loggedIn={this.props.loggedIn}/></li>
                </ul>
                <ul className="right hide-on-med-and-up"> {/* on mobile screens */}
                  <li><a href="#"><i className="material-icons">person_pin</i>Guest</a></li>      
                  <li><a href="#" className='button_slider_playlists'><i className="material-icons">video_library</i></a></li>      
                  <li><Login loggedIn={this.props.loggedIn}/></li>
                </ul>
            </div>
            }
             
            
        </nav>
      </div>
    );
  }

}
Navbar.contextTypes = {
  username: React.PropTypes.string
};
export default Navbar;

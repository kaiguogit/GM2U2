import React, {Component} from 'react';
import $ from 'jquery';
class Navbar extends Component {

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
          {/*  align-right items */}
          <ul className="right hide-on-small-only"> {/* on regular screens */}
            <li><a href="#"><i className="material-icons left">person_pin</i>Username</a></li>
            <li><a href="#" className='button_slider_playlists'><i className="material-icons left">video_library</i>Playlists</a></li>
          </ul>
          <ul className="right hide-on-med-and-up"> {/* on mobile screens */}
            <li><a href="#"><i className="material-icons">person_pin</i></a></li>      
            <li><a href="#" className='button_slider_playlists'><i className="material-icons">video_library</i></a></li>      
          </ul>
        </nav>
      </div>
    );
  }

}
export default Navbar;

import React, {Component} from 'react';
import WidgetIcon from './widget_icon.jsx'

class SidebarLeft extends Component {
  render() {
    return (
      <div id="sidebar_left" className={this.props.open ? 'col s4 m3 l2' : 'col s4 m3 l2 hidden'}>    
        <p>Your widgets:</p>
        <div id='container_widgets'>    
          <WidgetIcon/>
        </div>
      </div>
      
    );
  }
}
export default SidebarLeft;

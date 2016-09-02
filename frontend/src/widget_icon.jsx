import React, {Component} from 'react';

class WidgetIcon extends Component {
  render() {
    return (
      <div className='icon'>
        <div className = 'icon_logo teal lighten-2'></div>
          <small className='icon_name truncate'>Widget Name</small>
      </div>
    );
  }
}
export default WidgetIcon;

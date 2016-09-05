import React, {Component} from 'react';
import {handleDeleteWidget} from './widgetLibrary.js';

class TrafficWidget extends Component {

  componentDidMount() {
      console.log('Widget mounted');
    };
    
  render() {
    return (
      <div className="card teal darken-1">
        <div className="card-content white-text">
        <button onClick={handleDeleteWidget.bind(this)}>Delete this widget</button>

          <span className="card-title">Card Title</span>
          <span className="card-type">{this.props.widget.widgetType}</span>
          <span className="card-type">{this.props.widget.id}</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
      
    );
  }
}
export default TrafficWidget;

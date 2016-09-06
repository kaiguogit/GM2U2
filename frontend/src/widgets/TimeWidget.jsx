import React, {Component} from 'react';
import {handleDeleteWidget} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage } from '../Constants';
//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import WidgetCardHeader from './WidgetCardHeader.jsx';
import AudioPlayer from './AudioPlayer.jsx';


class TimeWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
      this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
      this.setState({expanded: toggle});
    };

    handleExpand = () => {
      this.setState({expanded: true});
    };

    handleReduce = () => {
      this.setState({expanded: false});
    };

  componentDidMount() {
      console.log('Widget mounted');
      var clock = $('.your-clock').FlipClock({
        clockFace: 'TwentyFourHourClock'
      });
      clock.start(function() {
        // Optional callback will fire when the clock starts
      });
    };

   render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <WidgetCardHeader widget={this.props.widget}/>
        <div className="your-clock"></div>
        <AudioPlayer widget={this.props.widget}/>
  
        <CardMedia
          expandable={true}
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="images/nature-600-337.jpg" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText >
          
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand} />
          <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
          <FlatButton label="Delete this widget" onTouchTap={this.handleReduce} 
            onTouchTap={handleDeleteWidget.bind(this)}
          />
        </CardActions>
      </Card>
    );
  }
}
export default TimeWidget;

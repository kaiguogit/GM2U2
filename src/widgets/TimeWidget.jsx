import React, {Component} from 'react';
import {handleDeleteWidget} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage } from '../Constants';
//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Settings from 'material-ui/svg-icons/action/settings';



import WidgetCardHeader from './WidgetCardHeader.jsx';
import AudioPlayer from './AudioPlayer.jsx';
//id generator
import newId from '../utils/newid';

//moment
var moment = require('moment');

const styles = {
  title: {
    cursor: 'pointer',
    // backgroundColor: '#cccccc',
    backgroundColor: '#333333',
    color: '#fff'
  },
  date:{
    color: '#333',
    fontSize: '3em' 
  }
};

class TimeWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      clockId: 'clock'
    };
  }

  handleSetting = () => {
    this.setState({expanded: !this.state.expanded});
  };

  componentWillMount(){
    var clockId = newId();
    this.clockId = clockId;
  }

  componentDidMount() {
    var clock =$(`#${this.clockId}`).FlipClock({
        clockFace: 'TwentyFourHourClock'
    });       
  };

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

   render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <AppBar
          style={styles.title}
          title=''
          iconElementLeft={
            <div>
            <span style={styles.title}>{this.capitalize(this.props.widget.widgetType)}</span>
              <IconButton >
                <NavigationClose color='white'/>
              </IconButton>
              <IconButton  onTouchTap={this.handleSetting} tooltip="Setting" touch={true} tooltipPosition="top-center">
                <Settings color='white'/>
              </IconButton>
            </div>
          }
          
          iconElementRight={
            <FlatButton label="Save" />
            
          }
        />
    <AudioPlayer widget={this.props.widget}/> 

    <CardText expandable={true}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardText>
      <div className="row">
        <div className="col s12 center-align" style={styles.date}>
          {moment().format('dddd MMMM Do')}
        </div>
      </div>
      <div className="row">
        <div className="col push-s3 s6 center-align" >
          <div id={this.clockId}></div>
        </div>
      </div>
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

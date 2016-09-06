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
    fontSize: '2.5em' 
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
  handleTouchTap() {
    alert('onTouchTap triggered on the title component');
  }
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
          iconElementLeft={
              <div>
                <Avatar src={WidgetIconImage[this.props.widget.widgetType]} />
                <IconButton >
                  <NavigationClose color='white'/>
                </IconButton>
                <IconButton  tooltip="Setting" touch={true} tooltipPosition="top-center">
                  <Settings color='white'/>
                </IconButton>
              </div>
          }
          title={<span style={styles.title}>{this.capitalize(this.props.widget.widgetType)}</span>}
          
          iconElementRight={<FlatButton label="Save" />}
        />

        <CardHeader
              avatar={WidgetIconImage[this.props.widget.widgetType]}
              children={
                <span>
                <ToolbarSeparator />
                <IconButton><NavigationClose /></IconButton>
                
                </span>
              }
        />
       

          
            
      
        <Toolbar>
          

          <ToolbarGroup firstChild={true}>
            <Avatar src={WidgetIconImage[this.props.widget.widgetType]} />
            <ToolbarTitle text={this.props.widget.widgetType}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="Options" />
            
            <ToolbarSeparator />
            <RaisedButton label="Create Broadcast" primary={true} />
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>

        <div className="row">
          <div className="col s3" style={styles.date}>
            {moment().format('dddd MMM Do')}
          </div>
          <div className="col s6" id={this.clockId}>
          </div>
        </div>
        <AudioPlayer widget={this.props.widget}/>
        
      
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText >
            <h3>Settings</h3>
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

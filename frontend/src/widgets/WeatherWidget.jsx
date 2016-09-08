import React, {Component} from 'react';
import {handleDeleteWidget, uploadSetting} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage, ClockFace } from '../Constants';
//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import WidgetCardToolbar from './WidgetCardToolbar.jsx'
import CitySelector from './WeatherWidget/CitySelector.jsx'
import RaisedButton from 'material-ui/RaisedButton';

//utils
import newId from '../utils/newid.js'
//moment
var moment = require('moment');

//magical update method
var update = require('react-addons-update');


const styles = {
  date:{
    color: '#333',
    fontSize: '3em' 
  },
  radioButton: {
    marginBottom: 16,
  }
};



class WeatherWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clockId: 'clock',
      widgetLocalCopy:{}
    };
  }

  componentDidMount() {
    //save a local copy of widget to state.
    this.setState({widgetLocalCopy: this.props.widget});

  };

  updateWidgetSetting(options){

    console.log("options passed in is", options);
    var updatedWidgetLocalCopy = update(this.state.widgetLocalCopy, options);

    console.log("updatedWidgetLocalCopy is", updatedWidgetLocalCopy);

    this.setState({
      widgetLocalCopy: updatedWidgetLocalCopy
    });
  }



   render() {
    return (
      <Card expanded={this.props.expanded} onExpandChange={this.handleExpandChange}>

        //Setting
        <CardText expandable={true}>
          <CitySelector updateWidgetSetting={this.updateWidgetSetting.bind(this)}/>
          <RaisedButton onClick={uploadSetting.bind(this)} label="Save Setting" primary={true}/>
        </CardText>

          <p>{this.state.widgetLocalCopy.cityName}</p>
          <p>{this.state.widgetLocalCopy.cityQuery}</p>
        
        //Main Content
        <CardText>
          <p>content</p>
        </CardText>
      </Card>
    );
  }
}
export default WeatherWidget;

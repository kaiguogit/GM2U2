import React, {Component} from 'react';
import {handleDeleteWidget, uploadSetting} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage, ClockFace } from '../Constants';
//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import WidgetCardToolbar from './WidgetCardToolbar.jsx'
import CitySelector from './WeatherWidget/CitySelector.jsx'
import RaisedButton from 'material-ui/RaisedButton';

//table
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
      expanded: false,
      clockId: 'clock',
      widgetLocalCopy:{}
    };
  }

  handleSetting = () => {
    this.setState({expanded: !this.state.expanded});
  };

  componentDidMount() {
    //save a local copy of widget to state.
    this.setState({widgetLocalCopy: this.props.widget});
    this.getWeather();

  };

  updateWidgetSetting(options){

    console.log("options passed in is", options);
    var updatedWidgetLocalCopy = update(this.state.widgetLocalCopy, options);

    console.log("updatedWidgetLocalCopy is", updatedWidgetLocalCopy);

    this.setState({
      widgetLocalCopy: updatedWidgetLocalCopy
    });
  }

  getWeather(){
    $.ajax({
      url: `http://localhost:3000/api/widgets/${this.props.widget.widgetType}/${this.props.widget.id}/view`,
      method: "get",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      }
    }).done(function(weather){
      console.log("weather obj is", weather);
      this.setState({weather: weather});
      console.log("this state weather is", this.state.weather);
    }.bind(this)).fail(function(err){
      console.log(err);
    });
  }

   render() {
    var weather = this.state.weather;

    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>

      //Toolbar
      <WidgetCardToolbar 
        widget={this.props.widget}
        onWidgetChange={this.props.onWidgetChange}
        handleSetting={this.handleSetting.bind(this)}
      />

    //Setting
    <CardText expandable={true}>
      <CitySelector updateWidgetSetting={this.updateWidgetSetting.bind(this)}/>
      <RaisedButton onClick={uploadSetting.bind(this)} label="Save Setting" primary={true}/>

    </CardText>
    
    //Main Content
    <CardText>
    {weather && 
      <div>
        <div className="row">
          <div className="col s4">
            <h3>{weather.current_observation.display_location.city}</h3>
          </div>
          <div className="col s8">
            <h3><img src={weather.current_observation.icon_url}/> {weather.current_observation.temp_c}&deg; {weather.current_observation.weather}</h3>
          </div>
        </div>

        <h5>Today: {weather.forecast.txt_forecast.forecastday[0].fcttext_metric}</h5>
     
        <div className="row">
        {
          weather.hourly_forecast.splice(0,10).map(function(hour){
            return(
              <div className="col s1 center-align" key={newId()}>
                <div>{hour.FCTTIME.hour_padded} {hour.FCTTIME.ampm}</div>
                <div><img src={hour.icon_url}/></div>
                <div>{hour.temp.metric}&deg;</div>
              </div>
            );
          })
        }
        </div>
        <div className="row">
          <div className="col s6">
            <Table selectable={false}>
              <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>WeekDay</TableHeaderColumn>
                  <TableHeaderColumn>Condition</TableHeaderColumn>
                  <TableHeaderColumn>High</TableHeaderColumn>
                  <TableHeaderColumn>Low</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
            {
              weather.forecast.simpleforecast.forecastday.map(function(day, index){
                if(index === 0 ){
                  return
                }else{
                  return (
                    <TableRow key={newId()}>
                      <TableRowColumn>{day.date.weekday}</TableRowColumn>
                      <TableRowColumn><img src={day.icon_url}/></TableRowColumn>
                      <TableRowColumn>{day.high.celsius}&deg;</TableRowColumn>
                      <TableRowColumn>{day.low.celsius}&deg;</TableRowColumn>
                    </TableRow>
                  )
                }
              })
            }
              </TableBody>
            </Table>
          </div>
          <div className="col s6">
            <ul>
              <li>Sunrise: {weather.sun_phase.sunrise.hour}:{weather.sun_phase.sunrise.minute}</li>
              <li>Sunset: {weather.sun_phase.sunset.hour}:{weather.sun_phase.sunset.minute}</li>
              <li>Moonrise: {weather.moon_phase.moonrise.hour}:{weather.moon_phase.moonrise.minute}</li>
              <li>Moonset: {weather.moon_phase.moonset.hour}:{weather.moon_phase.moonset.minute}</li>
              <li>Humidity: {weather.current_observation.relative_humidity}</li>
              <li>Feels Like: {weather.current_observation.feelslike_c}&deg;</li>
              <li>Pressure: {weather.current_observation.pressure_mb} mb</li>
              <li><a href={weather.current_observation.forecast_url}>WUnderground Forecast</a></li>
              <li>Visibility: {weather.current_observation.visibility_km} km</li>
              <li>Wind: {weather.current_observation.wind_string}</li>
            </ul>
          </div>

        </div>
      </div>
    }
    </CardText>
      </Card>
    );
  }
}
export default WeatherWidget;

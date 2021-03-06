import React, {Component} from 'react';
import {handleDeleteWidget, uploadSetting} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage, ClockFace } from '../Constants';
//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import CitySelector from './WeatherWidget/CitySelector.jsx'
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
//utils
import newId from '../utils/newid.js'
//moment
var moment = require('moment');

//magical update method
var update = require('react-addons-update');


const styles = {
  tbody:{
    height: "15em",
  },
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  moreInfo:{
    fontSize: '1em',
    overflow: 'auto',
    height: '20em'
  },
  hourlyScroll:{
    overflow: "auto",
    overflowY: "hidden",
  },
  hourlyRow:{
    width: "1878px",
  },
  hourlyItem:{
    float: "left",
    width: "50px",
    padding: "0 1px",
  },lastRow:{
    marginBottom: '0px'
  }
};



class WeatherWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clockId: 'clock',
      widgetLocalCopy:{},
      expanded: false
    };
  }


  toggleSettingExpanded(){
    this.setState({expanded: !this.state.expanded});
  };


  componentDidMount() {
    console.log("weather widget mounted");
    //save a local copy of widget to state.
    this.setState({widgetLocalCopy: this.props.widget});
    if(this.props.widget.cityQuery){
      this.getWeather();
    }else{
      this.setState({expanded: true});
      console.log("No city selected for this widget yet.");
    }
  };

  // Get weather when city is changed
  //http://stackoverflow.com/questions/24842505/reactjs-unexpected-infinite-loop-with-render
  //https://facebook.github.io/react/docs/component-specs.html
  componentDidUpdate(prevProps){
    console.log("Weather widget received update");
    console.log("Previous props ", prevProps.widget.cityQuery);
    console.log("Current props ", this.props.widget.cityQuery);
    if(prevProps.widget.cityQuery !== this.props.widget.cityQuery){
      console.log("City changed, getting weather");
      this.setState({refreshing: true});
      this.getWeather();
    }else{
      console.log("City did not changed, won't update weather");
    }
  }

  updateWidgetSetting(options){

    console.log("options passed in is", options);
    var updatedWidgetLocalCopy = update(this.state.widgetLocalCopy, options);

    console.log("updatedWidgetLocalCopy is", updatedWidgetLocalCopy);

    this.setState({
      widgetLocalCopy: updatedWidgetLocalCopy
    });
  }

  getWeather(){
    console.log("getting weather");
    $.ajax({
      url: `${process.env.host}/api/widgets/${this.props.widget.widgetType}/${this.props.widget.id}/view`,
      method: "get",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      }
    }).done(function(weather){
      console.log("weather obj is", weather);
      ///Testing purpose, SetTimeout to be removed
      this.setState({weather: weather});
      this.setState({refreshing: false});
    }.bind(this))
    .fail(function(err){
      console.log(err);
      this.setState({refreshing: false});
    });
  }

  handleSaveSetting(){
    uploadSetting.call(this);
    this.toggleSettingExpanded();
  }

  
   render() {

    var weather = this.state.weather;
    var refreshing = this.state.refreshing;

    return (

      <Card 
        expanded={this.state.expanded} 
        onExpandChange={this.handleExpandChange}
      >
        //Setting
        <CardText expandable={true}>
          <CitySelector updateWidgetSetting={this.updateWidgetSetting.bind(this)}/>
          <RaisedButton onClick={this.handleSaveSetting.bind(this)} label="Save Setting" primary={true}/>

        </CardText>

        {!weather &&
          <h4>No City selected. Please select a city in setting </h4>
        }
        {refreshing &&
          <div style={styles.container}>
            <LinearProgress mode="indeterminate" />
          </div>
        }
        //Main Content
        {weather && 
          <div>
            <div className="row" style={styles.lastRow}>
              <div className="col s4">
                <h3>{weather.current_observation.display_location.city}</h3>
              </div>
              <div className="col s8">
                <h3><img src={weather.current_observation.icon_url}/> {weather.current_observation.temp_c}&deg; {weather.current_observation.weather}</h3>
              </div>
            </div>

            <h5>Today: {weather.forecast.txt_forecast.forecastday[0].fcttext_metric}</h5>
            <div style={styles.hourlyScroll}>
            <div style={styles.hourlyRow}>
            {
              weather.hourly_forecast.map(function(hour){
                return(
                  <div style={styles.hourlyItem} className="center-align" key={newId()}>
                    <div>{hour.FCTTIME.hour_padded} {hour.FCTTIME.ampm}</div>
                    <div><img src={hour.icon_url}/></div>
                    <div>{hour.temp.metric}&deg;</div>
                  </div>
                );
              })
            }
            </div>
            </div>
            <div className="row" style={styles.lastRow}>
              <div className="col s7">
                <table className="weatherForcast">
                  <thead >
                    <tr>
                      <th>WeekDay</th>
                      <th>Condition</th>
                      <th>High</th>
                      <th>Low</th>
                    </tr>
                  </thead>
                  <tbody style={styles.tbody}>
                {
                  weather.forecast.simpleforecast.forecastday.map(function(day, index){
                    if(index === 0 ){
                      return
                    }else{
                      return (
                        <tr key={newId()}>
                          <td>{day.date.weekday}</td>
                          <td><img src={day.icon_url}/></td>
                          <td>{day.high.celsius}&deg;</td>
                          <td>{day.low.celsius}&deg;</td>
                        </tr>
                      )
                    }
                  })
                }
                  </tbody>
                </table>
              </div>
              <div className="col s4" style={styles.moreInfo}>
                <ul>
                  <li>Sunrise: {weather.sun_phase.sunrise.hour}:{weather.sun_phase.sunrise.minute}</li>
                  <li>Sunset: {weather.sun_phase.sunset.hour}:{weather.sun_phase.sunset.minute}</li>
                  <li>Moonrise: {weather.moon_phase.moonrise.hour}:{weather.moon_phase.moonrise.minute}</li>
                  <li>Moonset: {weather.moon_phase.moonset.hour}:{weather.moon_phase.moonset.minute}</li>
                  <li>Humidity: {weather.current_observation.relative_humidity}</li>
                  <li>Feels Like: {weather.current_observation.feelslike_c}&deg;</li>
                  <li>Pressure: {weather.current_observation.pressure_mb} mb</li>
                  <li>Visibility: {weather.current_observation.visibility_km} km</li>
                  <li>Wind: {weather.current_observation.wind_string}</li>
                  <li><a href={weather.current_observation.forecast_url}>WUnderground Forecast</a></li>
                </ul>
              </div>

            </div>
          </div>
        }
      </Card>
    );
  }
}
export default WeatherWidget;

import React, {Component} from 'react';
import TimeWidget from './TimeWidget.jsx'
import WeatherWidget from './WeatherWidget.jsx'
import WidgetCardWrapper from './WidgetCardWrapper.jsx'
import { WidgetTypes } from './Constants';


class ActivePlaylist extends Component {
  componentDidMount() {
    console.log("Did mount active playlist Playlist is", this.props.playlist);
  };

  handleAddWidget(widgetType){

    //Post request to add widget
    $.ajax({
        url: `http://localhost:3000/api/playlists/${this.props.playlist.id}/${widgetType}Widget`,
        method: "post",
        headers: {
        'Authorization':  "Bearer " + window.localStorage.token
        }
      })
      .then(function(timeWidget) {
        switch(widgetType){
          case WidgetTypes.time:
            console.log(`creating  ${widgetType}`);
            break;
          case WidgetTypes.traffic:
            console.log(`creating  ${widgetType}`);
            break;
          case WidgetTypes.weather:
            console.log(`creating  ${widgetType}`);
          case WidgetTypes.calendar:
            console.log(`creating  ${widgetType}`);
            break;
          default:
            console.log(`nothing matches${widgetType}`);
            break;
        }
        console.log("timeWidget is", timeWidget);
        this.props.onPlaylistChange();
        console.log("Inside of active playlist Playlist is", this.props.playlist);
      }.bind(this));
  }

  render() {
    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2'>
        <WidgetCardWrapper onDropWidgetIcon={this.handleAddWidget.bind(this)}/>

        <button onClick={this.handleAddWidget.bind(this)}>Add Widget</button>
        <h2>{this.props.playlist.name}</h2>
        <h2>Id {this.props.playlist.id}</h2>
        {
          this.props.playlist.widgets.map(function(widget){
            switch(widget.widgetType){
              case WidgetTypes.time:
                return <TimeWidget widget={widget} onWidgetChange={this.props.onPlaylistChange} key={widget.id}/>
                break
              case WidgetTypes.weather:
                return <WeatherWidget widget={widget} onWidgetChange={this.props.onPlaylistChange} key={widget.id}/>
                break
              default:
                break
            }

          }.bind(this)) 
        }
      </div>  
    );
  }
}
export default ActivePlaylist;

import React, {Component} from 'react';
import TimeWidget from './widgets/TimeWidget.jsx'
import WeatherWidget from './widgets/WeatherWidget.jsx'
import TrafficWidget from './widgets/TrafficWidget.jsx'
import WidgetCardWrapper from './WidgetCardWrapper.jsx'
import { WidgetTypes } from './Constants';


class ActivePlaylist extends Component {
  componentDidMount() {
    console.log("Did mount active playlist Playlist is", this.props.playlist);
  };


  //Ajax call to Add widget to this playlist
  handleAddWidget(widgetType){

    //Post request to add widget
    $.ajax({
        url: `http://localhost:3000/api/playlists/${this.props.playlist.id}/${widgetType}Widget`,
        method: "post",
        headers: {
        'Authorization':  "Bearer " + window.localStorage.token
        }
      })
      .then(function(widget) {
        console.log();
        console.log("created widget", widget);
        console.log("created widget, type is", widget.widgetType);
        this.props.onPlaylistChange();
        console.log("Inside of active playlist Playlist is", this.props.playlist);
      }.bind(this));
  }

  render() {
    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2'>
        <WidgetCardWrapper onDropWidgetIcon={this.handleAddWidget.bind(this)}/>

        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.time)}>Add Widget</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.weather)}>Add Weather</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.traffic)}>Add Traffic</button>
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
              case WidgetTypes.traffic:
                return <TrafficWidget widget={widget} onWidgetChange={this.props.onPlaylistChange} key={widget.id}/>
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

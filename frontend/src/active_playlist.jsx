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
        console.log("!!!!!response from create widiget is below");
        console.log("created widget", widget);
        console.log("created widget, type is", widget.widgetType);
        this.props.onPlaylistChange();
        console.log("Inside of active playlist Playlist is", this.props.playlist);
      }.bind(this));
  }

  //Move item in array
  //http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
  handleMove(old_index, new_index){
    console.log('widgets moved')
    var newArray = this.props.playlist.widgets
    var moveItem = newArray.splice(old_index, 1)[0];
    newArray.splice(new_index, 0, moveItem);
    var newPlaylist = this.props.playlist;
    newPlaylist.widgets = newArray;

    $.ajax({
      url: `http://localhost:3000/api/playlists/${this.props.playlist.id}`,
      method: "put",
      data: {playlist: JSON.stringify(newPlaylist)},
      dataType: "json",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      }
    }).done(function(playlist){
      console.log("new Playlist is", playlist);
      this.props.onPlaylistChange();
    }.bind(this))
    .fail(function(err){
      console.log("request failed", err);
    });
  }

  render() {
    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2'>
        {/*
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.time)}>Add Widget</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.weather)}>Add Weather</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.traffic)}>Add Traffic</button>
        */}

        <p>{this.props.playlist.name}</p>
        <p>Id {this.props.playlist.id}</p>

        {console.log("the widget array is", this.props.playlist.widgets)}
        
        {this.props.playlist.widgets.map(function(widget, index){
          console.log("creating cards", widget)
          return( 
            <WidgetCardWrapper 
              position={index}
              onDropWidgetIcon={this.handleAddWidget.bind(this)} 
              widget={widget} 
              onWidgetChange={this.props.onPlaylistChange} 
              key={widget.id}
              onMove={this.handleMove.bind(this)}
            />
          )
        }.bind(this)) }
        {/* place holder div with min height but no widget type */}
        <WidgetCardWrapper 
          position={this.props.playlist.widgets.length}
          onMove={this.handleMove.bind(this)}
          onDropWidgetIcon={this.handleAddWidget.bind(this)}
        />
      </div>  
    );
  }
}
export default ActivePlaylist;

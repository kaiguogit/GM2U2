import React, {Component} from 'react';
import TimeWidget from './widgets/TimeWidget.jsx'
import WeatherWidget from './widgets/WeatherWidget.jsx'
import TrafficWidget from './widgets/TrafficWidget.jsx'
import WidgetCardWrapper from './WidgetCardWrapper.jsx'
import { WidgetTypes } from './Constants';
//utils
import newId from './utils/newid.js'


class ActivePlaylist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playingWidgetIndex: null
    }
  }

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

    var newArray = this.props.playlist.widgets

    console.log("before change array", newArray);

    var moveItem = newArray.splice(old_index, 1)[0];

    console.log("removed item, then array is", newArray);

    newArray.splice(new_index, 0, moveItem);


    console.log("put item back to new index, then array is", newArray);

    
    // console.log("order changed", newArray);

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

  playNextWidget(){
    if(Number.isInteger(this.state.playingWidgetIndex) && this.state.playingWidgetIndex < Object.keys(this.refs).length){
      //Play next widget
      console.log("Setting playingWidgetIndex to", this.state.playingWidgetIndex + 1);
      this.setState({playingWidgetIndex: this.state.playingWidgetIndex + 1});
    }else{
      //Stop
      console.log("Setting playingWidgetIndex to null");
      this.setState({playingWidgetIndex: null});
    }
  }

  playWidget(){
    var id = Object.keys(this.refs)[this.state.playingWidgetIndex];
    var playingWidget = this.refs[id]
    console.log("playingWidget is", playingWidget);
    playingWidget.decoratedComponentInstance.refs["widget"].refs["toolbar"].refs["audioPlayer"].handleSpeak();
  }

  playAllWidget(){
    console.log("Setting playingWidgetIndex to 0 ");
    this.setState({playingWidgetIndex: 0});
  }

  getChildContext(){
    return {playNextWidget: this.playNextWidget.bind(this)};
  }
  
  componentDidUpdate(){
    if(Number.isInteger(this.state.playingWidgetIndex)&& this.state.playingWidgetIndex < Object.keys(this.refs).length){
      console.log(`Playing ${this.state.playingWidgetIndex}th widget`);
      this.playWidget();
    }
  }
  render() {
    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2'>
        <button onClick={this.playAllWidget.bind(this)}>Play All</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.time)}>Add Widget</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.weather)}>Add Weather</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.traffic)}>Add Traffic</button>
        <p>{this.props.playlist.name}</p>
        <p>Id {this.props.playlist.id}</p>
        <p>playing widget index is  {this.state.playingWidgetIndex}</p>
        {
          this.props.playlist.widgets.map(function(widget, index){
            console.log("creating cards");
            return <WidgetCardWrapper 
              ref={newId()}
              position={index}
              onDropWidgetIcon={this.handleAddWidget.bind(this)} 
              widget={widget} 
              onWidgetChange={this.props.onPlaylistChange} 
              key={widget.id}
              onMove={this.handleMove.bind(this)}
            />
          }.bind(this)) 
        }
      </div>  
    );
  }
}

ActivePlaylist.childContextTypes = {
  playNextWidget: React.PropTypes.func
};
export default ActivePlaylist;

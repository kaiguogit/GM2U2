import React, {Component} from 'react';

//Material-ui
import RaisedButton from 'material-ui/RaisedButton';
import ActionAlarm from 'material-ui/svg-icons/action/alarm';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

//Components
import TimeWidget from './widgets/TimeWidget.jsx'
import WeatherWidget from './widgets/WeatherWidget.jsx'
import TrafficWidget from './widgets/TrafficWidget.jsx'
import WidgetCardWrapper from './WidgetCardWrapper.jsx'
import { WidgetTypes } from './Constants';
import Alarm from './Alarm.jsx';
//utils
import newId from './utils/newid.js'


const styles = {
  button: {
    margin: 12,
  },
}
class ActivePlaylist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playingWidgetIndex: null,
      alarmDialogOpen: false
    }
  }
  
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
  
  //Open alarm dialog
  handleAlarmDialogOpen(){
    console.log("in dialogopen this is", this);
    this.setState({alarmDialogOpen: true});
  }

  //Open alarm dialog
  handleAlarmDialogClose(){
    this.setState({alarmDialogOpen: false});
  }

  //Change playingWidgetIndex to play next widget;
  playNextWidget(){
    if(this.isPlayingDone()){
      //Stop
      console.log("Setting playingWidgetIndex to null");
      this.setState({playingWidgetIndex: null});
    }else{
      //Play next widget
      console.log("Setting playingWidgetIndex to", this.state.playingWidgetIndex + 1);
      this.setState({playingWidgetIndex: this.state.playingWidgetIndex + 1});
    }
  }

  //Call audio player of each widget to play
  playWidget(){
    var id = Object.keys(this.refs)[this.state.playingWidgetIndex];
    var playingWidget = this.refs[id]
    console.log("playingWidget is", playingWidget);
    playingWidget.decoratedComponentInstance.refs["widget"].refs["toolbar"].refs["audioPlayer"].handleSpeak();
  }

  //Start to play all widget
  playAllWidgets(){
    if(Object.keys(this.refs).length > 0 ){
      console.log("Setting playingWidgetIndex to 0 ");
      this.setState({playingWidgetIndex: 0});
    }else{
      console.log("No widget to play");
    }
  }

  getChildContext(){
    return {playNextWidget: this.playNextWidget.bind(this)};
  }
  
  //If playingWidgetIndex is validated, play widget
  componentDidUpdate(){
    if(this.isPlaying()){
      if(!this.isPlayingDone()){
        console.log(`Playing ${this.state.playingWidgetIndex}th widget`);
        this.playWidget();      
      }else{
        console.log("Setting playingWidgetIndex to null ");
        this.setState({playingWidgetIndex: null})
      }
    }
  }

  //Index is a number
  isPlaying(){
    return Number.isInteger(this.state.playingWidgetIndex);
  }

  //Index is not a number or out of range of widgets count
  //It means the playing is done. 
  isPlayingDone(){
    return !(Number.isInteger(this.state.playingWidgetIndex) && this.state.playingWidgetIndex < Object.keys(this.refs).length)
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleAlarmDialogClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleAlarmDialogClose.bind(this)}
      />,
    ];

    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2'>
        
        <RaisedButton
          label="Set Alarm"
          labelPosition="after"
          primary={true}
          icon={<ActionAlarm />}
          style={styles.button}
          onTouchTap={this.handleAlarmDialogOpen.bind(this)}
        />

        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.alarmDialogOpen}
          autoDetectWindowHeight={false}

        >
          <Alarm onRing={this.playAllWidgets.bind(this)}/>
        </Dialog>

        <button onClick={this.playAllWidgets.bind(this)}>Play All</button>
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

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
  AlarmButton: {
    margin: 12,
  },
  AlarmActionButton:{
    float: 'right'
  }
}
class ActivePlaylist extends Component {


  constructor(props) {
    super(props);
    this.state = {
      playingWidgetIndex: null,
    }
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

    this.uploadPlaylist(newPlaylist);
  }

  //////////////////////////////
  //AJAX CALL!!!!!update playlist 
  //////////////////////////////
  uploadPlaylist(newPlaylist){
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

    // this.setState({alarmDialogOpen: true});
    $('#alarm').openModal();
  }

  //Open alarm dialog
  handleAlarmDialogSubmit(){

    //Alarms is an array
    var newPlaylist = this.props.playlist;

    newPlaylist.alarms = this.refs.alarm.refs.alarmList.state.alarms;

    this.uploadPlaylist(newPlaylist);
    $('#alarm').closeModal();
  }

  //Open alarm dialog
  handleAlarmDialogCancel(){

    // findDOMNode(this.refs.alarm).reset();
    console.log("alarm dialog cancel, alarm is", this.refs.alarm);
    console.log("Alarms passed from active playlist to alarm is", this.state.alarms);
    this.refs.alarm.refs.alarmList.updateState();

    $('#alarm').closeModal();
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
    var id = this.props.playlist.widgets[this.state.playingWidgetIndex].id;
    var playingWidget = this.refs[id]
    console.log("playingWidget is", playingWidget);
    playingWidget.decoratedComponentInstance.decoratedComponentInstance.refs["toolbar"].refs["audioPlayer"].handleSpeak();
  }

  //Start to play all widget
  playAllWidgets(){
    if(this.props.playlist.widgets.length > 0 ){
      console.log("Setting playingWidgetIndex to 0 ");
      this.setState({playingWidgetIndex: 0});
    }else{
      console.log("No widget to play");
    }
  }

  //Call User's phone number and play all widgets
  ring(){
    $.ajax({
      url: `http://localhost:3000/api/playlists/${this.props.playlist.id}/call`,
      method: 'get',
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      }
    }).done(function(response){
      console.log(response);
      Materialize.toast(response.message, 4000,'',function(){})
    }).fail(function(err){
      console.log(err);
    })
  }

  uploadPhoneNumber(){
    $.ajax({
      url: `http://localhost:3000/phone`,
      method: "post",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      },
      data: {phoneNumber: $("input[name='phoneNumber']").val()}
    }).done(function(response){
      console.log("uploadedPhoneNumber, response is", response);
    }).fail(function(err){
      console.log("failed to uploadPhoneNumber, error is", err);
    });
  }

  getChildContext(){
    return {playNextWidget: this.playNextWidget.bind(this)};
  }
  

  //Index is a number
  isPlaying(){
    return Number.isInteger(this.state.playingWidgetIndex);
  }

  //Index is not a number or out of range of widgets count
  //It means the playing is done. 
  isPlayingDone(){
    return !(Number.isInteger(this.state.playingWidgetIndex) && this.state.playingWidgetIndex < this.props.playlist.widgets.length)
  }

  render() {

    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2'>
        

        <RaisedButton
          label="Set Alarm"
          labelPosition="after"
          primary={true}
          icon={<ActionAlarm />}
          style={styles.AlarmButton}
          onTouchTap={this.handleAlarmDialogOpen.bind(this)}
        />
        <div id="alarm" className="modal">
          <div className="modal-content">
            <Alarm 
              onRing={this.playAllWidgets.bind(this)}
              alarms={this.props.playlist.alarms}
              ref="alarm"
            />
          </div>
          <div className="modal-footer">
            <FlatButton
              label="Submit"
              primary={true}
              onTouchTap={this.handleAlarmDialogSubmit.bind(this)}
              style={styles.AlarmActionButton}
            />
            <FlatButton
              label="Cancel"
              primary={true}
              style={styles.AlarmActionButton}
              onTouchTap={this.handleAlarmDialogCancel.bind(this)}
            />
          </div>
        </div>
        
        <button onClick={this.playAllWidgets.bind(this)}>Play All</button>
        <button onClick={this.ring.bind(this)}>Play All on phone</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.time)}>Add Widget</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.weather)}>Add Weather</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.traffic)}>Add Traffic</button>
        <button onClick={this.handleAddWidget.bind(this, WidgetTypes.news)}>Add News</button>
        <input type="text" name="phoneNumber"/>
        <button onClick={this.uploadPhoneNumber.bind(this)}>Enter Phone Number</button>
        <button onClick={this.ring.bind(this)}>Call</button>

        <p>{this.props.playlist.name}</p>
        <p>Id {this.props.playlist.id}</p>
        <p>playing widget index is  {this.state.playingWidgetIndex}</p>
        {
          this.props.playlist.widgets.map(function(widget, index){
            console.log("creating cards");
            return (
              <WidgetCardWrapper 
                ref={widget.id}
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
          widget={{widgetType: null}}
        />
      </div>  
    );
  }
}

ActivePlaylist.childContextTypes = {
  playNextWidget: React.PropTypes.func
};
export default ActivePlaylist;

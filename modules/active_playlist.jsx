import React, {Component} from 'react';

//Material-ui
import RaisedButton from 'material-ui/RaisedButton';
import ActionAlarm from 'material-ui/svg-icons/action/alarm';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline';
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-outline';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';

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
  activePlaylist:{
  },
  AlarmButton: {
    margin: 1,
  },
  AlarmActionButton:{
    float: 'right'
  },
  PhoneDialog:{
    width: '30%'
  },
  pauseButton:{
    backgroundColor: '#FF3B58'
  },
  playlistName:{
    fontFamily: 'Georgia',
    fontSize: '2em'
  }
}
class ActivePlaylist extends Component {


  constructor(props) {
    super(props);
    this.state = {
      playingWidgetIndex: null,
      editingName: false,
      dataSource:[]
    }
  }

  //If playingWidgetIndex is validated, play widget
  componentDidUpdate(){
    if(this.isPlaying()){
      this.playWidget();      
    }
  }
  //Ajax call to Add widget to this playlist
  handleAddWidget(widgetType, position){
    //Post request to add widget
    $.ajax({
      url: `${process.env.host}/api/playlists/${this.props.playlist.id}/${widgetType}Widget`,
      method: "post",
      data: {position: position},
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      }
    })
    .then(function(playlist) {
      console.log("!!!!!response from create widiget is below");
      console.log("created widget, new playlist is", playlist);
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

  startEditName(){
    this.setState({editingName: true})
  }

  finishEditName(value){
    if(value.trim() === "" ){
      this.setState({editingName: false});
    } else {
    var newPlaylist = this.props.playlist;
    newPlaylist.name = value;
    this.uploadPlaylist(newPlaylist);
    this.setState({editingName: false});
  }}

  //////////////////////////////
  //AJAX CALL!!!!!update playlist 
  //////////////////////////////
  uploadPlaylist(newPlaylist){
    $.ajax({
      url: `${process.env.host}/api/playlists/${this.props.playlist.id}`,
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

  //Open alarm dialog
  handlePhoneDialogOpen(){
    // this.setState({alarmDialogOpen: true});
    $('#editPhoneNumber').openModal();
  }

  //Open alarm dialog
  handlePhoneDialogCancel(){
    $('#editPhoneNumber').closeModal();
  }

  //Open alarm dialog
  handlePhoneDialogSubmit(){
    this.props.updatePhoneNumber($("input[name='phoneNumber']").val())
    $('#editPhoneNumber').closeModal();
  }


  pauseAllWidget(){
    $('audio').attr("src", "");
    $('audio').each(function(index, item){
      item.controls = false;
    });
    $('body').css('cursor', 'auto');
    this.showAll();
    this.unDimAll();
    this.setState({playingWidgetIndex: null});

  }
  //Change playingWidgetIndex to play next widget;
  playNextWidget(){
    if(this.isPlayingDone()){
      //Stop
      this.showAll();
      this.unDimAll();
      console.log("Setting playingWidgetIndex to null");
      this.setState({playingWidgetIndex: null});
    }else{
      //Play next widget
      var id = this.props.playlist.widgets[this.state.playingWidgetIndex].id;
      this.slideAway(id);
      console.log("Setting playingWidgetIndex to", this.state.playingWidgetIndex + 1);
      this.setState({playingWidgetIndex: this.state.playingWidgetIndex + 1});
    }
  }

  slideAway(widgetId){
    console.log("slideaway is called");
    $(`#${widgetId}`).animate({left: '150%'}, 1000).hide('slow');
  }

  showAll(){
    console.log("show all is called");
    $(".widgetCardWrapper").animate({left: '0%'}, 500).fadeIn('slow');
  }

  dimAll(){
    $(".widgetCardWrapper").css("opacity", "0.3");
  }

  unDimAll(){
    $(".widgetCardWrapper").css("opacity", "1");
  }

  unDim(widgetId){
    $(`#${widgetId}`).css("opacity", "1");
  }

  //Call audio player of each widget to play
  playWidget(){    
    var id = this.props.playlist.widgets[this.state.playingWidgetIndex].id;
    var playingWidget = this.refs[id]
    console.log("playingWidget is", playingWidget);
    console.log("playing widget id is", playingWidget.props.widget.id);
    this.dimAll();
    this.unDim(id);
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
    if(this.context.phoneNumber){
      $.ajax({
        url: `${process.env.host}/api/playlists/${this.props.playlist.id}/call`,
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
    }else{
      Materialize.toast("No Phone Number in record. Please set a phone number", 4000,'',function(){})

    }
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
    console.log("checking if playing is done");
    console.log("index is", this.state.playingWidgetIndex);
    console.log("index is out of widget count", (this.state.playingWidgetIndex >= (this.props.playlist.widgets.length - 1)));
    var result = (!(Number.isInteger(this.state.playingWidgetIndex)) || (this.state.playingWidgetIndex >= (this.props.playlist.widgets.length - 1)))
    console.log("result passed out is", result);
    return result;
  }

  //expand all collapse card
  expandAll(){
    //https://codepen.io/jasonpaul/pen/NxjvjW
    //how to expand all
    let $header = $('.collapsible .collapsible-header');
    $(".collapsible-header").addClass("active");
    $(".collapsible").collapsible({accordion: false});
  }

  //collapse all collapse card
  collapseAll(){
    $(".collapsible-header").removeClass("active");
    $(".collapsible").collapsible({accordion: true});
    $(".collapsible").collapsible({accordion: false});
  }

  render() {

    return (
      <div id = 'contents' className = 'col s12 m10 offset-m1 l8 offset-l2' style={styles.activePlaylist}>
        <div>
          {
            !this.state.editingName &&
            <span style={styles.playlistName} >{this.props.playlist.name}</span>
          }
          {
            this.state.editingName &&
            <AutoComplete
              hintText={this.props.playlist.name}
              textFieldStyle={styles.playlistName}
              dataSource={this.state.dataSource}
              onNewRequest={this.finishEditName.bind(this)}
            />
          }
          <IconButton             
            onClick={this.startEditName.bind(this)}
          >
            <EditIcon color={'#575755'}/>
          </IconButton>
        </div>
        {/*Edit Alarm*/}
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
        
        {/*Edit Phone number*/}
        <RaisedButton
          label="Edit Phone No."
          labelPosition="after"
          primary={true}
          icon={<EditIcon />}
          style={styles.AlarmButton}
          onTouchTap={this.handlePhoneDialogOpen.bind(this)}
        />
        <div id="editPhoneNumber" className="modal" style={styles.PhoneDialog}>
          <div className="modal-content">
              {this.context.phoneNumber &&
                <p>Current Number: {this.context.phoneNumber}</p>
              }
              <input type="text" name="phoneNumber"/>
          </div>
          <div className="modal-footer">
            <FlatButton
              label="Submit"
              primary={true}
              onTouchTap={this.handlePhoneDialogSubmit.bind(this)}
              style={styles.AlarmActionButton}
            />
            <FlatButton
              label="Cancel"
              primary={true}
              style={styles.AlarmActionButton}
              onTouchTap={this.handlePhoneDialogCancel.bind(this)}
            />
          </div>
        </div>

        <RaisedButton
          label="Play on Phone"
          labelPosition="after"
          primary={true}
          icon={<PhoneIcon />}
          style={styles.AlarmButton}
          onTouchTap={this.ring.bind(this)}
        />
        {this.isPlaying() &&
          <RaisedButton
            label="Stop playing"
            labelPosition="after"
            secondary={true}
            icon={<PauseIcon />}
            onTouchTap={this.pauseAllWidget.bind(this)}
          />
        }
        {!this.isPlaying() &&
          <RaisedButton
            label="Play on Browser"
            labelPosition="after"
            primary={true}
            icon={<PlayIcon />}
            style={styles.AlarmButton}
            onTouchTap={this.playAllWidgets.bind(this)}
          />
        }
        

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
                expandAll={this.expandAll}
                collapseAll={this.collapseAll}
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
ActivePlaylist.contextTypes = {
  username: React.PropTypes.string,
  phoneNumber: React.PropTypes.string
};
export default ActivePlaylist;

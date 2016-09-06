import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

function synthesizeRequest(options) {
    var sessionPermissions = "false";
    var downloadURL = 'http://localhost:3000/api/synthesize' +
      '?voice=' + options.voice +
      '&text=' + encodeURIComponent(options.text) +
      '&X-WDC-PL-OPT-OUT=' +  sessionPermissions;

    if (options.download) {
      downloadURL += '&download=true';
      window.location.href = downloadURL;
      return true;
    }

    var audio = $('#audio').get(0);
    audio.pause();
    audio.src = downloadURL;
    // enableButtons(true);
    audio.addEventListener('canplaythrough', onCanplaythrough);
    audio.muted = true;
    audio.play();
    $('body').css('cursor', 'wait');
    $('#speak-button').css('cursor', 'wait');
    return true;
}


function onCanplaythrough() {
  console.log('onCanplaythrough');
  var audio = $('#audio').get(0);
  audio.removeEventListener('canplaythrough', onCanplaythrough);
  try {
    audio.currentTime = 0;
  }
  catch(ex) {
    // ignore. Firefox just freaks out here for no apparent reason.
  }
  audio.controls = true;
  audio.muted = false;
  $('body').css('cursor', 'wait');
  $('#speak-button').css('cursor', 'pointer');
}

function getTimeString(){
  console.log("in gettimestring, this is", this);
  return $.ajax({
    url: `http://localhost:3000/api/playlists/timeWidget/${this.props.widget.id}/time`,
    method: 'get',
    headers: {
        'Authorization':  "Bearer " + window.localStorage.token
    }
  });
}

class AudioPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transcript: "",
    };
  }

  handleDownload(){
    var utteranceDownloadOptions = {
      text: "Hello, Ken is awesome",
      voice: 'en-US_AllisonVoice',
      download: true
    };
    synthesizeRequest(utteranceDownloadOptions);
  }

  handleSpeak() {
    getTimeString.call(this).then(function(timeString){
      
      var utteranceOptions = {
        text: timeString,
        voice: 'en-US_AllisonVoice',
        sessionPermissions: 1
      };

      //change transcript 
      console.log(timeString);
      //Speak!!!!
      synthesizeRequest(utteranceOptions);
    return false;
    });
  }

  render() {
    return (
      <div className="audioParent">
        <FlatButton label="DownloadVoice" onTouchTap={this.handleDownload} />
        <FlatButton id="speak-button" label="Speak" onTouchTap={this.handleSpeak.bind(this)} />
        <audio id="audio">
        Your browser does not support the audio element.
        </audio>
      </div>
    )
  }
}
export default AudioPlayer;
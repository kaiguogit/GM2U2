import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

//utils
import newId from '../utils/newid.js'

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

    var audio = $(`#${this.audioId}`).get(0);
    audio.pause();
    audio.src = downloadURL;
    // enableButtons(true);

    //Event listener
    audio.addEventListener('canplaythrough', onCanplaythrough);
    audio.addEventListener('ended', onEnded);

    
    audio.muted = true;
    audio.play();
    $('body').css('cursor', 'wait');
    $('#speak-button').css('cursor', 'wait');
    return true;
}

function onEnded(){
  var audio = this;
  audio.controls = false;
  $('body').css('cursor', 'auto');
  $('#speak-button').css('cursor', 'auto');

  playNextWidget();
}

function onCanplaythrough() {
  var audio = this;
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

function getSpeechString(){
  console.log("in getSpeechString");
  return $.ajax({
    url: `http://localhost:3000/api/widgets/${this.props.widget.widgetType}/${this.props.widget.id}/speech`,
    method: 'get',
    headers: {
        'Authorization':  "Bearer " + window.localStorage.token
    }
  });
}

var playNextWidget;

class AudioPlayer extends Component {

  componentWillMount(){
    var audioId = newId();
    this.audioId = audioId;
  }

  componentDidMount(){
    playNextWidget = this.context.playNextWidget;
  }

  constructor(props) {
    super(props);
    this.state = {
      transcript: "",
    };
  }

  handleSpeak() {
    getSpeechString.call(this).then(function(speechString){
      
      var utteranceOptions = {
        text: speechString,
        voice: 'en-US_AllisonVoice',
        sessionPermissions: 1
      };

      //change transcript 
      console.log(speechString);
      //Speak!!!!
      synthesizeRequest.call(this, utteranceOptions);
    return false;
    }.bind(this));
  }



  render() {
    return (
      <div className="valign-wrapper">
    {/*
        <FlatButton label="DownloadVoice" onTouchTap={this.handleDownload} />
    */}
        <RaisedButton 
          className="valign"
          id="speak-button" 
          label="Speak" 
          onTouchTap={this.handleSpeak.bind(this)} 
          primary={true}
        />
        <audio 
          className="valign"
          id={this.audioId}
        >

          Your browser does not support the audio element.
        </audio>
      </div>
    )
  }
}

AudioPlayer.contextTypes = {
  playNextWidget: React.PropTypes.func
};
export default AudioPlayer;
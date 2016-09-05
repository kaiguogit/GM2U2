import React, {Component} from 'react';

class TimeWidget extends Component {

  componentDidMount() {
      console.log('Widget mounted');
    };
  
  handleDeleteWidget(){
    // //Delete request to delete widget
    console.log("In timewidget delete function token is", window.localStorage.token);
    console.log("In timewidget delete function token is", `http://localhost:3000/api/playlists/timeWidget/${this.props.widget.id}`);
    $.ajax({
        url: `http://localhost:3000/api/playlists/timeWidget/${this.props.widget.id}`,
        method: "delete",
        headers: {
        'Authorization':  "Bearer " + window.localStorage.token
        }
      })
      .then(function(message) {
        console.log("message is", message);
        this.props.onWidgetChange();
      }.bind(this));


    //Post request to add widget
    // $.ajax({
    //     url: `http://localhost:3000/api/playlists/1/timeWidget`,
    //     method: "post",
    //     headers: {
    //     'Authorization':  "Bearer " + window.localStorage.token
    //     }
    //   })
    //   .then(function(timeWidget) {
    //     console.log("timeWidget is", timeWidget);
    //     // this.props.onPlaylistChange();
    //     // console.log("Inside of active playlist Playlist is", this.props.playlist);
    //   }.bind(this));
  }

  render() {
    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <button onClick={this.handleDeleteWidget.bind(this)}>Delete this widget</button>
          <span className="card-title">Card Title</span>
          <span className="card-type">{this.props.widget.widgetType}</span>
          <span className="card-type">{this.props.widget.id}</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
      
    );
  }
}
export default TimeWidget;

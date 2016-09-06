  
//Delete request to delete widget
export function handleDeleteWidget(){
    
  $.ajax({
      url: `http://localhost:3000/api/playlists/${this.props.widget.widgetType}Widget/${this.props.widget.id}`,
      method: "delete",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      }
    })
    .then(function(message) {
      console.log("message is", message);
      this.props.onWidgetChange();
    }.bind(this));
  }
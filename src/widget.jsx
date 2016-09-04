import React, {Component} from 'react';



class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widget: {}
    }
  }

  componentDidMount() {
      console.log('Widget mounted');
      if(this.props.widgetId){
        console.log(`Ajax, Getting widget ${this.props.widgetId}`);
        $.ajax({
          url: `http://localhost:3000/api/playlists/widget/${this.props.widgetId}`,
          method: "get",
          headers: {
          'Authorization':  "Bearer " + window.localStorage.token
          }
        })
        .then(function(widget) {
          console.log("widget is", widget);
          this.setState({widget: widget})
        }.bind(this));
      }
    };
    
  render() {
    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Card Title</span>
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
export default Widget;

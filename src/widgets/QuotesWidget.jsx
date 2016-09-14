import React, {Component} from 'react';
import {uploadSetting} from './widgetLibrary.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

//magical update method
var update = require('react-addons-update');

const quoteStyle = {
  color: '#656559',
  fontFamily: "Georgia",
}

const styles = {
  button: {
    margin: 12,
  }
}

class QuotesWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      widgetLocalCopy:{},
      expanded: false,      
    };
  }

  toggleSettingExpanded = () => {
    this.setState({expanded: !this.state.expanded});
  };


  componentDidMount() {
    this.setState({widgetLocalCopy: this.props.widget});   
    this.getQuote();
  };

  getQuote(){
    console.log('getting quote')
    $.ajax({
      url: `http://localhost:3000/api/widgets/${this.props.widget.widgetType}/${this.props.widget.id}/view`,
      method: "get",
      dataType: "json",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      }
    }).done(function(data){
      console.log(data)
      this.saveQuote(data);
      var data = JSON.parse(data)      
      this.setState({author: data.quoteAuthor});
      this.setState({quote: data.quoteText});
      // save quote to database for get speech string
    }.bind(this))
  };

  saveQuote(data){
    console.log('saving quote data', data)
    var updatedWidgetLocalCopy = update(this.state.widgetLocalCopy, {data: {$set: data}});
    this.setState({
      widgetLocalCopy: updatedWidgetLocalCopy
    });
    console.log('state widgetLocalCopy',this.state.widgetLocalCopy)
    uploadSetting.call(this)
  }


   render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>

        //Setting
        <CardText expandable={true}>
          <RaisedButton label="New Quote" labelPosition="before" primary={true} style={styles.button} onClick={this.getQuote.bind(this)}/>
        </CardText>

        //Main Content
        <CardText>
        <h4 style={quoteStyle}>{this.state.quote}</h4>
        <h6>- <a href={`http://en.wikipedia.org/wiki/${this.state.author}`} target="_blank">{this.state.author}</a></h6>
        </CardText>
      </Card>
    );
  }
}
export default QuotesWidget;

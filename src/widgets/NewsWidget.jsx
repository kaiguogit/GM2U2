import React, {Component} from 'react';
import {handleDeleteWidget, uploadSetting} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage, ClockFace } from '../Constants';
//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import CitySelector from './WeatherWidget/CitySelector.jsx'
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
//utils
import newId from '../utils/newid.js'
//moment
var moment = require('moment');

//magical update method
var update = require('react-addons-update');


const styles = {
  tbody:{
    height: "15em",
  },
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  img:{
    width: '100%'
  },
  news:{
    height: '30em',
    overflow: 'auto'
  },
  newsTitle:{
    fontWeight: 'bold',
    fontSize: '1.1em'
  }
};



class NewsWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clockId: 'clock',
      widgetLocalCopy:{},
      expanded: false
    };
  }


  toggleSettingExpanded = () => {
    this.setState({expanded: !this.state.expanded});
  };


  componentDidMount() {
    console.log("weather widget mounted");
    //save a local copy of widget to state.
    this.setState({widgetLocalCopy: this.props.widget});
    this.getNews();
  
  };

  updateWidgetSetting(options){

    console.log("options passed in is", options);
    var updatedWidgetLocalCopy = update(this.state.widgetLocalCopy, options);

    console.log("updatedWidgetLocalCopy is", updatedWidgetLocalCopy);

    this.setState({
      widgetLocalCopy: updatedWidgetLocalCopy
    });
  }

  getNews(){
    this.setState({refreshing: true});
    console.log("getting news");
    $.ajax({
      url: `http://localhost:3000/api/widgets/${this.props.widget.widgetType}/${this.props.widget.id}/view`,
      method: "get",
      dataType: "json",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      }
    }).done(function(news){
      news = JSON.parse(news)
      console.log("news obj is", news);
      ///Testing purpose, SetTimeout to be removed
      setTimeout(function(){
        this.setState({news: news.articles});
        this.setState({refreshing: false});
      }.bind(this), 50)
    }.bind(this)).fail(function(err){
      console.log(err);
      this.setState({refreshing: false});
    });
  }

  handleSaveSetting(){
    uploadSetting.call(this);
    this.toggleSettingExpanded();
  }

  
   render() {

    var news = this.state.news;
    var refreshing = this.state.refreshing;

    return (

      <Card 
        expanded={this.state.expanded} 
        onExpandChange={this.handleExpandChange}
      >
        //Setting
        <CardText expandable={true}>
          <CitySelector updateWidgetSetting={this.updateWidgetSetting.bind(this)}/>
          <RaisedButton onClick={this.handleSaveSetting.bind(this)} label="Save Setting" primary={true}/>

        </CardText>

        {!news &&
          <h4>No News yet. </h4>
        }
        {news &&
          <div className="news" style={styles.news}>
            {news.map(function(article){
              return (
                <div className="row news-item" key={newId()}>
                  <div className="col s3 news-img" >
                    <img src={article.urlToImage} style={styles.img}/>
                  </div>
                  <div className="col s9 news-content">
                    <div className="news-title" style={styles.newsTitle}>
                      <a href={article.url}>{article.title}</a>
                    </div>
                    <div className="news-description">
                      {article.description}
                    </div>
                  </div>
                </div>
              )}
            )}
          </div>
        }
        {refreshing &&
          <div style={styles.container}>
            <LinearProgress mode="indeterminate" />
          </div>
        }

      </Card>
    );
  }
}
export default NewsWidget;

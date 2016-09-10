import React, {Component} from 'react';
import {handleDeleteWidget} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage, ClockFace } from '../Constants';

//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import WidgetCardToolbar from './WidgetCardToolbar.jsx'

//utils
import newId from '../utils/newid.js'
//moment
var moment = require('moment');

const styles = {
};



class TrafficWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      expanded: true,
      widgetLocalCopy:{},
      dataSource: [],      
    };
  };

  toggleSettingExpanded = () => {
    this.setState({expanded: !this.state.expanded});
  };
  

  componentDidMount() {
    console.log("traffic widget mounted");
    this.setState({widgetLocalCopy: this.props.widget});      
    this.setState({AutocompleteService: new google.maps.places.AutocompleteService()});
    console.log('google maps AutocompleteService constructor:', new google.maps.places.AutocompleteService())    
    console.log('google maps AutocompleteService state:', this.state.AutocompleteService)
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('google maps AutocompleteService state:', this.state.AutocompleteService)
  };

  displaySuggestions(predictions, status) {
    /*
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }
    */
    var suggestions = predictions.map((prediction,index,array)=>{return prediction.description})
    console.log('suggestions',suggestions)
    this.setState({dataSource: suggestions})
    console.log('dataSource:',this.state.dataSource)
  };

  updateOrigin(input){
    console.log('origin input changed, input is:', input)
    this.state.AutocompleteService.getQueryPredictions(
      { input: `${input}` }, 
      this.displaySuggestions.bind(this)
    )
  }

   render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>

        <CardText expandable={true}>
          <h1>Settings:</h1>
          <AutoComplete hintText='Route Origin' onUpdateInput={this.updateOrigin.bind(this)} dataSource={this.state.dataSource}/>
          <p>destination auto complete
          mode of transportation autocomplete drop down
          auto save so no submit button</p>
        </CardText>

        <CardText>
          <h1>google maps with route to destination</h1>
          <h1>estimated time to destination</h1>
          <iframe width="100%" height="500" frameBorder="0" style={{border:0}} allowFullScreen
            src="https://www.google.com/maps/embed/v1/directions?mode=walking&origin=place_id:ChIJVVVFhnlxhlQRVqDISA_7Lc8&destination=place_id:ChIJofc2FJt0hlQRb64ACVph3Gk&key=AIzaSyDuX8bDIG5SH98UqlVdrVyTH6K5G-pZoHY">
          </iframe>
        </CardText>          
        
      </Card>
    );
  }
}
export default TrafficWidget;

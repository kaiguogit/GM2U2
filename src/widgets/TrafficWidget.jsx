import React, {Component} from 'react';
import {handleDeleteWidget, uploadSetting} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage, ClockFace } from '../Constants';

//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import WidgetCardToolbar from './WidgetCardToolbar.jsx'

//utils
import newId from '../utils/newid.js'

//magical update method
var update = require('react-addons-update');

//moment
var moment = require('moment');

const styles = {
};



class TrafficWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      expanded: false,
      widgetLocalCopy:{},
      suggestions: [], 
      modes: ['walking','bicycling','transit','driving'],
      mode: 'walking'
    };
  };

  toggleSettingExpanded = () => {
    this.setState({expanded: !this.state.expanded});
  };
  

  componentDidMount() {
    console.log("traffic widget mounted");
    console.log("traffic widget mounted, this.props.widget:", this.props.widget);
    this.setState({widgetLocalCopy: this.props.widget});      
    this.setState({AutocompleteService: new google.maps.places.AutocompleteService()});
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('traffic widget updated, widgetLocalCopy:', this.state.widgetLocalCopy)
  };

  displaySuggestions(predictions, status) {
    /*
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }
    */
    var suggestions = predictions.map((prediction,index,array)=>{return prediction.description})
    this.setState({suggestions: suggestions})
    console.log('suggestions:',this.state.suggestions)
  };

  updateAutoComplete(input){
    console.log('autocomplete input changed, input is:', input)
    this.state.AutocompleteService.getQueryPredictions(
      { input: `${input}` }, 
      this.displaySuggestions.bind(this)
    )
  }

  updateMapOrigin(input){
    var formattedInput = input.split(/[\s,]+/).join('+')
    // update map
    this.setState({origin: formattedInput})
    console.log('state origin',this.state.origin)
    // save to database
    var updatedWidgetLocalCopy = update(this.state.widgetLocalCopy, {origin: {$set: input}});
    this.setState({
      widgetLocalCopy: updatedWidgetLocalCopy
    });
    console.log('state widgetLocalCopy',this.state.widgetLocalCopy)
    uploadSetting.call(this)
  }

  updateMapDestination(input){
    var formattedInput = input.split(/[\s,]+/).join('+')
    this.setState({destination: formattedInput})
    console.log('state Destination',this.state.destination)
    // save to database
    var updatedWidgetLocalCopy = update(this.state.widgetLocalCopy, {destination: {$set: input}});
    this.setState({
      widgetLocalCopy: updatedWidgetLocalCopy
    });
    console.log('state widgetLocalCopy',this.state.widgetLocalCopy)
    uploadSetting.call(this)
  }

  updateMapMode(input){
    this.setState({mode: input})
    console.log('state mode',this.state.mode)
    var updatedWidgetLocalCopy = update(this.state.widgetLocalCopy, {mode: {$set: input}});
    this.setState({
      widgetLocalCopy: updatedWidgetLocalCopy
    });
    console.log('state widgetLocopy',this.state.widgetLocalCopy)
    uploadSetting.call(this)
  }


   render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>

        <CardText expandable={true}>
          <div>          
            <AutoComplete 
              hintText='Enter location name or address' 
              searchText={this.props.widget.origin}
              onUpdateInput={this.updateAutoComplete.bind(this)} 
              onNewRequest={this.updateMapOrigin.bind(this)} 
              dataSource={this.state.suggestions}
              floatingLabelText="Trip Origin"
              filter={AutoComplete.fuzzyFilter}
            /><br />
            <AutoComplete 
              hintText='Enter location name or address' 
              searchText={this.props.widget.destination}
              onUpdateInput={this.updateAutoComplete.bind(this)} 
              onNewRequest={this.updateMapDestination.bind(this)} 
              dataSource={this.state.suggestions}
              floatingLabelText="Trip Destination"
              filter={AutoComplete.fuzzyFilter}
              /><br />
            <AutoComplete
              floatingLabelText="Mode of Transportation"
              filter={AutoComplete.noFilter}
              openOnFocus={true}
              dataSource={this.state.modes}
              searchText={this.props.widget.mode}
              onNewRequest={this.updateMapMode.bind(this)} 
            />
          </div>
        </CardText>

        <CardText>      
          <iframe width="100%" height="500" frameBorder="0" style={{border:0}} src={`https://www.google.com/maps/embed/v1/directions?mode=${this.props.widget.mode}&origin=${this.props.widget.origin}&destination=${this.props.widget.destination}&key=AIzaSyDuX8bDIG5SH98UqlVdrVyTH6K5G-pZoHY`}>
          </iframe>
        </CardText>          
        
      </Card>
    );
  }
}
export default TrafficWidget;

import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { NewsSource } from '../../Constants';
const styles = {
  radioButton: {
    marginBottom: 16,
  },
};
export default class SourceSelector extends React.Component {

  handleSelectCity(chosenRequest, value){
    console.log("chosenrequest is", chosenRequest);
    console.log("value is", value);
    console.log("look up value in constants is", NewsSource[value]);
    // var newOption = {cityName: {$set: chosenRequest.name},
    //                  cityQuery: {$set: chosenRequest.l} 
    //                 }
    var newOption = {source: {$set: NewsSource[value]}}
    this.props.updateWidgetSetting(newOption);
  }
  render() {
    return (
      <div>
        <RadioButtonGroup name="newsSource" defaultSelected={this.props.source.name} onChange={this.handleSelectCity.bind(this)}>
              <RadioButton
                value="the-new-york-times"
                label="New York Times"
                style={styles.radioButton}
              />
              <RadioButton
                value="espn"
                label="ESPN"
                style={styles.radioButton}
              />
        </RadioButtonGroup>
      </div>
    );
  }
}
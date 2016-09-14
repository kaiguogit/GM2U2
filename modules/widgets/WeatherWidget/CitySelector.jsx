import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

//Autocomplete on WU API
//It will return an array of cities.
function searchCity(keyword, callback){
  $.ajax({
    url: "http://autocomplete.wunderground.com/aq",
    method: "get",
    data: {query: keyword},
    dataType: "jsonp",
    jsonp: "cb",
    success: function(cities){
      callback(cities.RESULTS);
    }
  });
}

const dataSourceConfig = {
  text: 'name',
  value: 'l',
};

const styles = {
  citySelector:{
    boxShadow: '0 0px 0 0',
    color: 'green'
  }
}

export default class CitySelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  handleUpdateInput(value){
    searchCity(value, function(cities){
      console.log('inside autocomplete callback,this is ', this)
      this.setState({
        dataSource: cities,
      });
    }.bind(this));
  };

  handleSelectCity(chosenRequest, index){
    console.log("chosenrequest is", chosenRequest);
    console.log("in select city event, this is", this);
    var newOption = {cityName: {$set: chosenRequest.name},
                     cityQuery: {$set: chosenRequest.l} 
                    }
    this.props.updateWidgetSetting(newOption);
  }
  render() {
    return (
      <div>
        <AutoComplete
          hintText="Type anything"
          style={styles.citySelector}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.dataSource}
          floatingLabelText="Search by City Name"
          dataSourceConfig={dataSourceConfig}
          maxSearchResults={10}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleSelectCity.bind(this)}
        />
      </div>
    );
  }
}
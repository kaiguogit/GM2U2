import React, {Component} from 'react';
import {handleDeleteWidget} from './widgetLibrary.js';
import { WidgetTypes, WidgetIconImage } from '../Constants';
import WidgetCardHeader from './WidgetCardHeader.jsx';

//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


class WeatherWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
      this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
      this.setState({expanded: toggle});
    };

    handleExpand = () => {
      this.setState({expanded: true});
    };

    handleReduce = () => {
      this.setState({expanded: false});
    };

  componentDidMount() {
      console.log('Widget mounted');
    };

   render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <WidgetCardHeader widget={this.props.widget}/>

        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="This toggle controls the expanded state of the component."
          />
        </CardText>
        <CardMedia
          expandable={true}
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="images/nature-600-337.jpg" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand} />
          <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
          <FlatButton label="Delete this widget" onTouchTap={this.handleReduce} 
            onTouchTap={handleDeleteWidget.bind(this)}
          />
        </CardActions>
      </Card>
    );
  }
}
export default WeatherWidget;

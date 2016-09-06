import React, {Component} from 'react';
import { WidgetIconImage } from '../Constants';
//material-ui
import {CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class WidgetCardHeader extends Component {


  componentDidMount() {
      console.log('Widget mounted');
    };

   render() {
    return (
      <CardHeader
        title={this.props.widget.widgetType}
        subtitle={this.props.widget.id}
        avatar={WidgetIconImage[this.props.widget.widgetType]}
        actAsExpander={true}
        showExpandableButton={true}
      />
    );
  }
}
export default WidgetCardHeader;

import React, {Component, PropTypes} from 'react';
import { ItemTypes, WidgetTypes } from './Constants';
import { DragSource } from 'react-dnd';

const widgetIconSource = {
  beginDrag(props) {
    console.log("Begin drag, widgettype is", props.widgetType);
    props.collapseAll();
    return {widgetType: props.widgetType};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class WidgetIcon extends Component {
  render() {
    const { connectDragSource, isDragging, connectDragPreview } = this.props;

    return connectDragSource(
      <div style={{
        position: 'relative',
        width: '30%',
        height: '50%',
        margin: '20px'
      }}>
        <img style={{
                width: '100%',
                height: '100%'
                }} src={this.props.imgsource}/>
        {this.props.children}
        <span className='icon_name truncate'>{this.props.widgetType}</span>
      </div>
    );
  }
}
WidgetIcon.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};
export default DragSource(ItemTypes.WIDGETICON, widgetIconSource, collect)(WidgetIcon);

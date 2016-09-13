import React, {Component, PropTypes} from 'react';
import { ItemTypes, WidgetTypes } from './Constants';
import { DragSource } from 'react-dnd';

const widgetIconSource = {
  beginDrag(props) {
    console.log("Begin drag, widgettype is", props.widgetType);
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
  componentDidMount() {
    const img = new Image();
    img.src = './public/Maps-preview.jpg'
    // img.onload = () => this.props.connectDragPreview(img);
  }
  render() {
    const { connectDragSource, isDragging, connectDragPreview } = this.props;

    return connectDragSource(
      <div style={{
        position: 'relative',
        width: '50%',
        height: '50%'
      }}>
        <img style={{
                width: '100%',
                height: '100%'
                }} src={this.props.imgsource}/>
        {this.props.children}
        <small className='icon_name truncate'>{this.props.widgetType}</small>
      </div>
    );
  }
}
WidgetIcon.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};
export default DragSource(ItemTypes.WIDGETICON, widgetIconSource, collect)(WidgetIcon);

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
<<<<<<< HEAD:frontend/modules/widget_icon.jsx
=======
  componentDidMount() {
    const img = new Image();
    img.src = '/images/Maps-preview.jpg'
    // img.onload = () => this.props.connectDragPreview(img);
  }
>>>>>>> 5cdbe6811c4cfa03dcbe7b9f11ce78ab0efb7a0a:frontend/modules/widget_icon.jsx
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

import React, { Component, PropTypes } from 'react';
import WidgetCard from './WidgetCard.jsx';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';


const widgetCardWrapperTarget = {
  canDrop(props, monitor) {
    console.log("dragging object is", monitor.getItem());
    return true;
  },
  drop(props, monitor) {
    console.log("droping here, props is", props);
    props.onDropWidgetIcon(monitor.getItem().widgetType);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class WidgetCardWrapper extends Component {
  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <h2>Waiting content</h2>
        <WidgetCard >
          {this.props.children}
        </WidgetCard>
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

WidgetCardWrapper.propTypes = {
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.WIDGETICON, widgetCardWrapperTarget, collect)(WidgetCardWrapper);
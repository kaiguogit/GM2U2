import React, { Component, PropTypes } from 'react';
import WidgetCard from './WidgetCard';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';


const widgetCardWrapperTarget = {
  canDrop(props) {
    return true;
  },
  drop(props) {
    console.log("droping here, props is", props);
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
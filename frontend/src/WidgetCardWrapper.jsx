import React, { Component, PropTypes } from 'react';
import TimeWidget from './widgets/TimeWidget.jsx';
import TrafficWidget from './widgets/TrafficWidget.jsx';
import WeatherWidget from './widgets/WeatherWidget.jsx';

// dnd
import { ItemTypes } from './Constants';
import { DropTarget, DragSource } from 'react-dnd';
import { WidgetTypes } from './Constants';

//material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import DragHandle from 'material-ui/svg-icons/editor/drag-handle';


const widgetCardWrapperTarget = {
  canDrop(props, monitor) {
    console.log("dragging object is", monitor.getItem());
    return true;
  },
  drop(props, monitor) {
    console.log("droping here, props is", props);
    // dropping icon, then add widget
    const widgetType = monitor.getItem().widgetType;
    widgetType && props.onDropWidgetIcon(widgetType);
    // dropping widget, then move widget
    var old_index = monitor.getItem().old_index;
    if(old_index < props.position){
      var new_index = props.position-1;

    }else{
      var new_index = props.position;
    }
    console.log('old_index', old_index);
    console.log('new_index', new_index);
    Number.isInteger(old_index) && Number.isInteger(old_index) && props.onMove(old_index, new_index);
  }
};

const widgetCardSource = {
  beginDrag(props, monitor){
    console.log('beginDrag, props are', props)
    return {old_index: props.position}
  },
  endDrag(props, monitor){
    console.log('endDrag props:', props)
  }
};

// function collect(connect, monitor) {
//   return {
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//     canDrop: monitor.canDrop()
//   };
// }

//material-ui for button
const style = {
    marginRight: 20,
  };

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
  renderGreyBox(){
    return(
      <div style={{
        position: 'relative',
        top: 0,
        left: 0,
        height: '150px',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: 'black',
      }} 
      />
    );
  }
  renderWidgets(){
    switch(this.props.widget.widgetType){
      case WidgetTypes.time:
        return  <TimeWidget 
                  widget={this.props.widget} 
                  onWidgetChange={this.props.onWidgetChange}
                />
        break;
      case WidgetTypes.weather:
        return  <WeatherWidget 
                  widget={this.props.widget} 
                  onWidgetChange={this.props.onWidgetChange}
                />
        break;
      case WidgetTypes.traffic:
        return  <TrafficWidget 
                  widget={this.props.widget} 
                  onWidgetChange={this.props.onWidgetChange}
                />
        break;
      default:
        break;  
    }
  }

  handleMoveUp(){
    if(this.props.position !== 0){
    this.props.onMove(this.props.position, this.props.position-1);
    }
  }

  handleMoveDown(){
    this.props.onMove(this.props.position, this.props.position+1);
  }

  render() {

    const { connectDropTarget, connectDragPreview, connectDragSource, isOver, canDrop, isDragging } = this.props;
    if (isDragging) {
      return null;
    }

    return connectDropTarget(connectDragPreview(
      <div>
        {isOver && canDrop && this.renderGreyBox()}
        {!this.props.widget && <div style={{minHeight:"150px", width:"100%"}}/>}     
        {this.props.widget && 
          <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <FloatingActionButton mini={true} style={style} onClick={this.handleMoveUp.bind(this)}>
            <ArrowUp />
          </FloatingActionButton>
          <FloatingActionButton mini={true} style={style} onClick={this.handleMoveDown.bind(this)}>
            <ArrowDown />
          </FloatingActionButton>
          {connectDragSource(
            <div>           
              <FloatingActionButton mini={true} style={style} onClick={this.handleMoveDown.bind(this)}>
                <DragHandle />
              </FloatingActionButton>
            </div>
          )}      
          {
            this.renderWidgets()
          }
          {/*!isOver && canDrop && this.renderOverlay('yellow')*/}
          {/*isOver && canDrop && this.renderOverlay('green')*/}
          
        </div>}
      </div>
    ));
  }
}

WidgetCardWrapper.propTypes = {
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.WIDGETICON, widgetCardWrapperTarget, (connect, monitor)=>({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
  (DragSource(ItemTypes.WIDGETICON, widgetCardSource, (connect, monitor)=>({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
    (WidgetCardWrapper)
);
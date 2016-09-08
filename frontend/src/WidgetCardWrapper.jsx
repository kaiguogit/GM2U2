import React, { Component, PropTypes } from 'react';
import TimeWidget from './widgets/TimeWidget.jsx';
import TrafficWidget from './widgets/TrafficWidget.jsx';
import WeatherWidget from './widgets/WeatherWidget.jsx';
import WidgetCardToolbar from './widgets/WidgetCardToolbar.jsx'


// dnd

import { DropTarget, DragSource } from 'react-dnd';

//material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import DragHandle from 'material-ui/svg-icons/editor/drag-handle';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import { ItemTypes, WidgetTypes, WidgetIconImage } from './Constants.js';

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
    console.log('beginDrag, props are', props);
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
  constructor(props){
    super(props);
    this.state={
      WidgetIconImage: WidgetIconImage,
      expanded: false
    }
  }

  handleSetting = () => {
    this.setState({expanded: !this.state.expanded});
  };

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

  handleMoveUp(){
    if(this.props.position !== 0){
    this.props.onMove(this.props.position, this.props.position-1);
    }
  }

  handleMoveDown(){
    this.props.onMove(this.props.position, this.props.position+1);
  }

  componentDidMount() {
    const img = new Image();
    console.log('component did mount, widget type is ', this.props.widget.widgetType)
    img.src = this.state.WidgetIconImage[this.props.widget.widgetType];
    img.onload = () => this.props.connectDragPreview(img);
  }
  render() {

    const { connectDropTarget, connectDragPreview, connectDragSource, isOver, canDrop, isDragging } = this.props;
    if (isDragging) {
      return null;
    }

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        {/* Drop target grey box*/}
        {isOver && canDrop && this.renderGreyBox()}
        {/* Widget wrapped in a div */}
        {this.props.widget && 
          
          <div style={{
            position: 'relative',
            width: '100%'
            }}
          >
            { console.log("before switch",this.props.widget.widgetType)}
            {(() => { 
              switch(this.props.widget.widgetType){
                case WidgetTypes.time:
                  return (
                    <div>
                      <WidgetCardToolbar 
                        widget={this.props.widget}
                        onWidgetChange={this.props.onWidgetChange}
                        handleSetting={this.handleSetting.bind(this)}
                      >
                      {connectDragSource(
                        <div>
                          <IconButton  tooltip="Drag" touch={true} tooltipPosition="top-center">
                            <DragHandle/>
                          </IconButton>
                        </div>
                      )}
                      </WidgetCardToolbar>
                      <TimeWidget 
                        widget={this.props.widget} 
                        onWidgetChange={this.props.onWidgetChange}
                        expanded={this.state.expanded}
                      />                      
                    </div>
                    )
                  break;
                case WidgetTypes.weather:
                  return  (
                    <div>
                      <WidgetCardToolbar 
                        widget={this.props.widget}
                        onWidgetChange={this.props.onWidgetChange}
                        handleSetting={this.handleSetting.bind(this)}
                      >
                      {connectDragSource(
                        <div>
                          <IconButton  tooltip="Drag" touch={true} tooltipPosition="top-center">
                            <DragHandle/>
                          </IconButton>
                        </div>
                      )}
                      </WidgetCardToolbar>
                      <WeatherWidget 
                        widget={this.props.widget} 
                        onWidgetChange={this.props.onWidgetChange}
                        expanded={this.state.expanded}
                      />
                    </div>      
                    )
                  break;
                case WidgetTypes.traffic:
                  return (  
                    <div>
                      <WidgetCardToolbar 
                        widget={this.props.widget}
                        onWidgetChange={this.props.onWidgetChange}
                        handleSetting={this.handleSetting.bind(this)}
                      >
                      {connectDragSource(
                        <div>
                          <IconButton  tooltip="Drag" touch={true} tooltipPosition="top-center">
                            <DragHandle/>
                          </IconButton>
                        </div>
                      )}
                      </WidgetCardToolbar>
                      <TrafficWidget 
                        widget={this.props.widget} 
                        onWidgetChange={this.props.onWidgetChange}
                        expanded={this.state.expanded}
                      />
                    </div>
                   ) 
                  break;
                default:
                  return <div style={{minHeight:"150px", width:"100%"}}/> 
                  break;  
              }
            })()}
          </div>
          
        }

      </div>
    ); 
  }
}

WidgetCardWrapper.propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
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
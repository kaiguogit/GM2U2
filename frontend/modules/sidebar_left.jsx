import React, {Component} from 'react';
import WidgetIcon from './widget_icon.jsx'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { WidgetTypes, WidgetIconImage } from './Constants';



class SidebarLeft extends Component {

  render() {
    return (
      <Drawer open={this.props.open} >
        <AppBar title="Widgets"
          onClick={this.props.toggleSidebarLeft} 
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        />
        
        
        <div id='container_widgets' >    
          <WidgetIcon widgetType={WidgetTypes.time} imgsource={WidgetIconImage.time} collapseAll={this.props.collapseAll}/>
          <WidgetIcon widgetType={WidgetTypes.traffic} imgsource={WidgetIconImage.traffic} collapseAll={this.props.collapseAll}/>
          <WidgetIcon widgetType={WidgetTypes.weather} imgsource={WidgetIconImage.weather} collapseAll={this.props.collapseAll}/>
          <WidgetIcon widgetType={WidgetTypes.news} imgsource={WidgetIconImage.news} collapseAll={this.props.collapseAll}/>
          <WidgetIcon widgetType={WidgetTypes.quotes} imgsource={WidgetIconImage.quotes} collapseAll={this.props.collapseAll}/>
        </div>
      </Drawer>
    );
  }

   //
  //<div id="sidebar_left" className={this.props.open ? 'col s4 m3 l2' : 'col s4 m3 l2 hidden'}>    
        
  //</div>
      
}
export default SidebarLeft;
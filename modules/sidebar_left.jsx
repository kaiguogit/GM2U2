import React, {Component} from 'react';
import WidgetIcon from './widget_icon.jsx'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { WidgetTypes, WidgetIconImage } from './Constants';

const styles = {
  button:{margin: 12,},
  leftBar:{
    backgroundColor: '#ddd'
  }
};


class SidebarLeft extends Component {

  render() {
    return (
      <Drawer open={this.props.open} >
        <RaisedButton onClick={this.props.toggleSidebarLeft} label="Hide" primary={true} style={styles.button} />
        <p>Your widgets:</p>
        <div id='container_widgets' >    
          <WidgetIcon widgetType={WidgetTypes.time} imgsource={WidgetIconImage.time}/>
          <WidgetIcon widgetType={WidgetTypes.traffic} imgsource={WidgetIconImage.traffic} />
          <WidgetIcon widgetType={WidgetTypes.weather} imgsource={WidgetIconImage.weather}/>
          <WidgetIcon widgetType={WidgetTypes.news} imgsource={WidgetIconImage.news}/>
        </div>
      </Drawer>
    );
  }

   //
  //<div id="sidebar_left" className={this.props.open ? 'col s4 m3 l2' : 'col s4 m3 l2 hidden'}>    
        
  //</div>
      
}
export default SidebarLeft;
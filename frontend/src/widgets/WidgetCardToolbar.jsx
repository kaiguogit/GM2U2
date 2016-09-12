import React, {Component} from 'react';
import { WidgetIconImage } from '../Constants';
import AudioPlayer from './AudioPlayer.jsx';
import {handleDeleteWidget} from './widgetLibrary.js';

//material-ui
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Settings from 'material-ui/svg-icons/action/settings';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

//Double check
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const styles = {
  title:{
    color: '#000'
  },
  toolbar:{
    backgroundColor: '#333333'
  },  
  block: {
    maxWidth: 250,
  }
};


class WidgetCardToolbar extends Component {
  capitalizeWord(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  capitalizeTitle(){
    if(this.props.widget.widgetType === "news"){
      return this.props.widget.source.name.split("-").map(this.capitalizeWord).join(" ");
    }else{
      return this.capitalizeWord(this.props.widget.widgetType);
    }
  }

  componentDidMount() {
      console.log('Widget mounted');
    };

   render() {
    return (
      <Toolbar  >
        <ToolbarGroup firstChild={true} className="valign-wrapper">
          <Avatar src={WidgetIconImage[this.props.widget.widgetType]}/>
          <ToolbarTitle style={styles.title} text={this.capitalizeTitle()} />
          <AudioPlayer ref="audioPlayer" className="valign" widget={this.props.widget}/> 
        </ToolbarGroup>
        <ToolbarGroup>
          {this.props.children}
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            anchorOrigin={{"horizontal":"left","vertical":"bottom"}}
            targetOrigin={{"horizontal":"left","vertical":"top"}}
          >
            <MenuItem 
              primaryText="Delete This Widget" 
              onTouchTap={handleDeleteWidget.bind(this)}
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
export default WidgetCardToolbar;





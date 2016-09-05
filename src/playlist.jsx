import React, {Component} from 'react';
import WidgetIcon from './widget_icon.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

const style = {
  marginRight: 50,
};



class Playlist extends Component {
  handleDelete(){
    console.log("this is", this);
    console.log("This playlist's id is ",this.props.playlist.id );
    this.props.onDeletePlaylist(this.props.playlist.id);
  }

  handleSelect(){
    this.props.onSelectPlaylist(this.props.playlist.id);
  }

  render() {
    return (
      <div className='playlist' onClick={this.handleSelect.bind(this)}>
        <FloatingActionButton onClick={this.handleDelete.bind(this)} mini={true} style={style}>
          <ContentClear />
        </FloatingActionButton>
        <h>{this.props.playlist.name}</h>
        <WidgetIcon/>
      </div>
    );
  }
}
export default Playlist;
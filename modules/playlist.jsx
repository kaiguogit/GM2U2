import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

import {Card, CardActions, CardHeader} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';



class Playlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      info: "-"
    }
  }

  componentDidMount() {
    this.setPlaylistInfo() 
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.activePlaylist && 
    this.props.activePlaylist.id === this.props.playlist.id &&  
    $(`#${'pl'+this.props.playlist.id}`).addClass('active');  
  }

  setClassActive(){
    this.props.activePlaylist && 
    this.props.activePlaylist.id === this.props.playlist.id &&
    this.setState({active: true}) 
  }

  setClassNotActive(){
    this.props.activePlaylist && 
    this.props.activePlaylist.id !== this.props.playlist.id &&
    this.setState({active: false}) 
  }

  handleDelete(){
    console.log("this is", this);
    console.log("This playlist's id is ",this.props.playlist.id );
    this.props.onDeletePlaylist(this.props.playlist.id);
  }

  handleSelect(){
    console.log('playlist is clicked');
    $('.playlist.active').removeClass('active');
    $(`#${'pl'+this.props.playlist.id}`).addClass('active');
    this.props.onSelectPlaylist(this.props.playlist.id);
  }

  setPlaylistInfo(){
    switch(this.props.playlist.widgets.length){
      case 0: 
        this.setState({info: "empty"})
        break;
      case 1:
        this.setState({info: this.props.playlist.widgets[0].widgetType})
        break;
      default: 
        this.setState({info: this.props.playlist.widgets.length + " widgets"})
    }
  }

  render() {
    var activeClass = this.state.active ? "active" : "not_active"
    return (
      <div className={"playlist "+activeClass} id={'pl'+this.props.playlist.id} onClick={this.handleSelect.bind(this)}>
        <Card>
          <CardHeader
            title={this.props.playlist.name}
            subtitle={this.state.info}              
            style={{display: 'inline-block', width: '75%', paddingRight: '0px'}}
          />
          <IconButton 
            tooltip="Delete Playlist" 
            onClick={this.handleDelete.bind(this)} 
            style={{display: 'inline-block', float: 'right'}}
          >
            <DeleteIcon />
          </IconButton>
        </Card>
      </div>
    );
  }
}

Playlist.contextTypes = {
  activePlaylist: React.PropTypes.object
};
export default Playlist;
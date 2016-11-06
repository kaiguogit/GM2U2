var models = require("../models");


module.exports.findPlaylistforWidget = function(widget){
  return models.playlist.findById(widget.playlistId);
}

module.exports.addToPlaylistArray = function(playlist, widget, position){
  console.log("in add to playlist array, this is", this);
  var widgets = playlist.dataValues.widgets
  if(position){
    widgets.splice(position, 0, widget)
  }else{
    widgets.push(widget);
  }
  return playlist.updateAttributes({widgets: widgets});
}

module.exports.deleteFromPlaylistArray = function(playlist, widget){
  //Remove the widget from array
  var widgets = playlist.dataValues.widgets;
  widgets.forEach(function(w, index){
      if(w.id === widget.id){
        widgets.splice(index, 1);
      }
    });
  // console.log("After splice, widgets is", widgets);
  return playlist.updateAttributes({widgets: widgets}).bind(this);
}

module.exports.updatePlaylistArray = function(playlist,widget){
  //Update the widget in array
  var widgets = playlist.dataValues.widgets;
  widgets.forEach(function(w, index){
      if(w.id === widget.id){
        widgets[index]= widget;
      }
    });
  return playlist.updateAttributes({widgets: widgets}).bind(this);
}

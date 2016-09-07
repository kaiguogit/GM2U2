var models = require("../models");


module.exports.findPlaylistforWidget = function(widget){
  console.log("\n!!!!!returned variable after create widget  is", widget.dataValues);
  return models.playlist.findById(widget.playlistId);
}

module.exports.addToPlaylistArray = function(playlist){
  console.log("\n!!!!!returned variable after finding playlist   is", playlist.dataValues);
  console.log("\n!!!!!Binded widiget in this is", this);
  var widgets = playlist.dataValues.widgets
  widgets.push(this);
  return playlist.updateAttributes({widgets: widgets});
}

module.exports.deleteFromPlaylistArray = function(playlist, widget){
  //Remove the widget from array
  console.log("\n!!!!!Deleting widget from array, id is", widget.id);
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
  console.log("\n!!!!!Updating widget in array, id is", widget.id);
  var widgets = playlist.dataValues.widgets;
  widgets.forEach(function(w, index){
      if(w.id === widget.id){
        widgets[index]= widget;
      }
    });
  return playlist.updateAttributes({widgets: widgets}).bind(this);
}
